const portMap = require("../port-map.json");
const { workspaces } = require("../package.json");

const names = workspaces.map((w) => w.split("/")[1]);

describe("portMap", () => {
  it("should have unique ports", () => {
    const ports = Object.values(portMap);
    const uniquePorts = new Set();

    ports.forEach((port) => {
      expect(uniquePorts).not.toContain(port);
      uniquePorts.add(port);
    });
  });

  it("should have entries for each workspace", () => {
    names.forEach((name) => {
      expect(Object.keys(portMap)).toContain(name);
    });
  });
});
