const { readdirSync } = require("fs");
const axios = require("axios");
const { join } = require("path");
const portMap = require("../port-map.json");

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

describe("Project statuses", () => {
  const projectNames = Object.keys(portMap);

  for (const name of projectNames) {
    const portNum = portMap[name];

    it(`${name} should be running on port ${portNum}`, async () => {
      try {
        const response = await axios.get(`http://localhost:${portNum}`);

        expect(response.status).toBe(200);
      } catch (err) {
        // Throw and error here to fail this test
        throw new Error(`${err} for ${name} on port number ${portNum}`);
      }
    });
  }
});
