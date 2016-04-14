import {FetchConfigProvider} from "./fetchConfigProvider";

export interface IConsulConfiguration{
  host: string;
  /** default 8500 */
  port?: number;
}

export class ConsulConfigProvider extends FetchConfigProvider{
  constructor(config: IConsulConfiguration, requestInit?: () => RequestInit){
    super(k => `http://${config.host}:${config.port||8500}/v1/kv/${k}`, requestInit)
  }
}
