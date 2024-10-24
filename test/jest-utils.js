const baseUrl = port => {
  if (process.env.DEMO_APPS_DOMAIN === 'localhost') {
    const url = new URL('https://localhost');
    url.port = port;
    return url;
  }

  if (process.env.GITPOD_HOST) {
    const url = new URL(
      `https://${port}-${process.env.GITPOD_WORKSPACE_ID}.${process.env.GITPOD_WORKSPACE_CLUSTER_HOST}`
    );
    return url;
  }
};

module.exports = {
  baseUrl
};
