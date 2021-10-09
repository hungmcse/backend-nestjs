exports.buildTSTask = {
	name: "tsc",
	script: "npm run tsc",
	watch: ["src", "core", "shared"],
	autorestart: false,
};


exports.appTask = {
	name: "app:dev",
	script: "dist/src/index.js",
	exec_mode: "cluster",
	instances: 1,
	autorestart: true,
	watch: ["dist"],
	max_memory_restart: "1G",
	restart_delay: 2000,
	kill_timeout: 10000,
	listen_timeout: 10000,
	wait_ready: true,
	env: {
		NODE_PATH: ".",
		MICROSERVICES: "app",
	},
};

exports.apps = [
	module.exports.buildTSTask,
	module.exports.appTask,
];
