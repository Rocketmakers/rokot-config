import {expect,sinon,supertest} from "rokot-test";

import {InProcConfigProvider} from "../inProcConfigProvider";
import {IConfigurationProvider} from "../core";

describe("InProcConfigProvider Test suite", () => {

  it("should be able to resolve known key", () => {
    var config:IConfigurationProvider = new InProcConfigProvider({"k":"v"})
    return expect(config.get<string>("k")).to.eventually.deep.equal("v");
  });

  it("should fail to resolve unknown key", () => {
    var config:IConfigurationProvider = new InProcConfigProvider({"k":"v"})
    return expect(config.get<string>("k1")).to.rejected;
  });
})
