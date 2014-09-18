var http = require("http"),
    https = require("https"),
    url = require("url"),
    StatsD = require("node-statsd").StatsD,
    statsdClient;

function StatsDProxy(config) {
    var t = this;

    if (!config || (config && !config.statd)) {
        console.log("No config");
        process.exit(1);
    }

    statsdClient = new StatsD ({
        'host': config.statsd.host,
        'port': config.statsd.port,
        'prefix': config.statsd.prefix ? config.statsd.prefix + '.' : ''
    });

    t.server = http.createServer(t.processRequest);
    t.serverS = https.createServer(t.processRequest);
}

StatsDProxy.prototype.start = function() {
    this.server.listen(80);
    this.serverS.listen(443);
};

StatsDProxy.prototype.processRequest = function(request, response) {
    if (request.method == "GET") {
        var params = url.parse(request.url, true);
        if (params.key) {
            statsdClient.increment(params.key, 1);
            response.writeHead(200);
            response.end();
        } else {
            response.writeHead(500);
            response.write("No key param");
            response.end();
        }
    } else {
        response.writeHead(404);
        response.end();
    }
};

module.exports = StatsDProxy;