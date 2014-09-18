var util = require("util");

if (!process.argv[2]) {
    util.error('Usage: ' + process.execPath + ' ' + process.argv[1]);
    util.error('Instance name must correspond to a config file in either ~/.statsdproxy/config.js or /etc/statsdproxy/config.js');
    process.exit(1);
}

var instance = process.argv[2];

var config = require('./config').readConfig(instance);

try {
    process.chdir(__dirname);
    var statsdproxy = new (require('./statsdproxy.js'))(config);
    statsdproxy.start();
} catch (error) {
    util.error(error.stack);
    throw error;
}