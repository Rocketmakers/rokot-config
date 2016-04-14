import fetch from "isomorphic-fetch";
import {IConfigurationProvider} from "./core";

export class FetchConfigProvider implements IConfigurationProvider{
  constructor(private getUrlForKey: (key: string) => string, private requestInit?: () => RequestInit){
  }

  get<T>(key: string): Promise<T>{
    const url = this.getUrlForKey(key);
    const promise = this.requestInit ? fetch(url, this.requestInit()) : fetch(url);
    return promise.then(r => {
      if (r.ok){
        return r.json<T>()
      }

      return Promise.reject("Unable to fetch");
    })
  }
}
