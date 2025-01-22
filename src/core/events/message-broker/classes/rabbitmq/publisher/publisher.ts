import { Channel, connect } from "amqplib/callback_api";
import { v4 as uuidv4 } from "uuid";
import environment from "../../../../../../config/environment";

//TODO: CREATE EVENT TYPES DINAMICALLY WITH A VRIABLE THAT LOAD THE EVENT TYPE FROM A FILE
export default class RabbitMQPublisher {
  private static channel?: Channel;

  private static async connect(): Promise<void> {
    return new Promise((resolve) => {
      connect(
        {
          protocol: environment.messageBroker.MESSAGE_BROKER_PROTOCOL,
          hostname: environment.messageBroker.MESSAGE_BROKER_HOST,
          port: environment.messageBroker.MESSAGE_BROKER_PORT,
          username: environment.messageBroker.MESSAGE_BROKER_USERNAME,
          password: environment.messageBroker.MESSAGE_BROKER_PASSWORD,
          vhost: environment.messageBroker.MESSAGE_BROKER_VHOST,
        },
        (err, connection) => {
          if (err && err instanceof Error) {
            console.log(`RabbitMQ Publisher Error: ${err.message}`);
            process.exit(1);
          } else {
            connection.createChannel(async (err, ch) => {
              if (err && err instanceof Error) {
                console.log(`RabbitMQ Publisher Error: ${err.message}`);
                process.exit(1);
              } else {
                this.channel = ch;
                console.log("RabbitMQ Publisher Up!");
                resolve();
              }
            });
          }
        }
      );

      process.on("exit", (_code) => {
        this.closeConnection();
      });
    });
  }

  private static closeConnection(): void {
    if (this.channel) {
      this.channel.close((err) => {
        if (err instanceof Error) {
          console.log(err.message);
        }
      });
      this.channel = undefined;
      console.log("RabbitMQ closing");
    }
  }

  private static getProperties(uuid: string, eventType?: string) {
    return {
      persistent: true,
      timestamp: new Date().getTime(),
      deliveryMode: 2,
      appId: environment.messageBroker.MESSAGE_BROKER_PUBLISH_APP_ID,
      type: `${environment.messageBroker.MESSAGE_BROKER_PUBLISH_APP_ID}.${eventType}`,
      messageId: uuid,
      headers: {
        content_type: "application/json",
        type: `${environment.messageBroker.MESSAGE_BROKER_PUBLISH_APP_ID}.${eventType}`,
      },
      contentType: "application/json",
    };
  }

  public static async publishData<T>(data: T, eventType?: string, signature?: string, exchange?: string) {
    try {
      if (!this.channel) await this.connect();

      const exchg = exchange || environment.messageBroker.MESSAGE_BROKER_EXCHANGE;
      const sign = signature || environment.messageBroker.MESSAGE_BROKER_ROUTING_KEY;
      if (this.channel) {
        this.channel.assertExchange(exchg, environment.messageBroker.MESSAGE_BROKER_EXCHANGE_TYPE, {
          durable: true,
        });
        const uuid = uuidv4();
        this.channel.publish(
          exchg,
          sign,
          Buffer.from(
            JSON.stringify(
              Object.assign(
                {},
                {
                  fired_at: new Date(),
                  uuid,
                  ...(data as Object),
                }
              )
            )
          ),
          { ...this.getProperties(uuid, eventType) }
        );
      }
      this.closeConnection();
    } catch (err) {
      throw err;
    }
  }
}
