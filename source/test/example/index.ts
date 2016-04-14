// import {ConsulConfigProvider} from "../../consulConfigProvider";
// const configProvider = new ConsulConfigProvider({host: "localhost", port:4500})
import {FetchConfigProvider} from "../../fetchConfigProvider";
const configProvider = new FetchConfigProvider(k => `http://localhost:4400/key/${k}`, () => {
  return {method: "GET"} as RequestInit;
})
// import {InProcConfigProvider} from "../../inProcConfigProvider";
// const configProvider = new InProcConfigProvider({"key":"value"})
// configProvider.get<string>("key") // = "value"
// configProvider.set("otherKey", 99);
// configProvider.get<number>("otherKey") // = 99
