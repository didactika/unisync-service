import dotenv from "dotenv";
dotenv.config();

export default {
    // App environment variables 
    APP_PORT: process.env.APP_PORT || "4000" , 

    // Service environment variables
    SERVICE_APP_NAME: process.env.SERVICE_APP_NAME || "unisync-service",

    //Database environment variables
    DB_HOST: process.env.DB_HOST || "localhost", 
    DB_PORT: process.env.DB_PORT || 27017,
    DB_NAME: process.env.DB_NAME || "unisync-service",
    DB_USERNAME: process.env.DB_USERNAME || "",
    DB_PASSWORD: process.env.DB_PASSWORD || "230$",

    //Domain environment variable
    DOMAIN_ALLOW: process.env.DOMAIN_ALLOW || "localhost"
} 
