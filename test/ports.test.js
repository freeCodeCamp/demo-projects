const portMap = require("../port-map.json");
const { readdirSync } = require("fs");
const { join } = require("path");

// Filter out hidden files and the nightlife-coordination-app directory
// until the project is replaced and is ready to be deployed
const names = readdirSync(join(__dirname, "../apps"))
  .filter((name) =>  !/(^|\/)\.[^/.]/g.test(name) && name !== "nightlife-coordination-app");

describe("portMap", () => {
  it("should have unique ports", () => {
    const ports = Object.values(portMap);
    const uniquePorts = new Set();

    ports.forEach((port) => {
      expect(uniquePorts).not.toContain(port);
      uniquePorts.add(port);
    });
  });

  it("should have entries for each project", () => {
    names.forEach((name) => {
      expect(Object.keys(portMap)).toContain(name);
    });
  });
});
