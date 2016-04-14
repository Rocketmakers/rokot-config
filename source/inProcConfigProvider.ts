import {IConfigurationProvider} from "./core";

export class InProcConfigProvider implements IConfigurationProvider{
  constructor(private cache: {[key: string]: any} = {}){}
  get<T>(key: string): Promise<T>{
    const value = this.cache[key] as T;
    console.log("value", value);
    return value ? Promise.resolve(value) : Promise.reject(`Missing configuration key '${key}'`);
  }

  set<T>(key: string, value: T){
    this.cache[key] = value;
  }
}
