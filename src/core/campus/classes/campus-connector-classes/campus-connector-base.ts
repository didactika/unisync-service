export default abstract class CampusConnectorBase {
  private _url: string;
  private _token: string;

  constructor(url: string, token: string) {
    this._url = url;
    this._token = token;
  }

  // Getters and setters
  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }
}
