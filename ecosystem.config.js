module.exports = {
  apps: [
    {
      name: "next-app",
      script: "node_modules/next/dist/bin/next",
      time: true,
      args: "start --port 3000",
      instances: 2,
      exec_mode: "cluster",
    },
  ],
};
