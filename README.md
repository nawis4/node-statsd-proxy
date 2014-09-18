# node-statsd-proxy

Proxy for incrementing graphite stats with GET requests

## Installation


## Config

Place config at /etc/statsdproxy/config.js or at ./.statsdproxy/config.js

Config example:
```
var config = {
    statsd: {
        "host": "graphite.local",                   //StatsD host
        "port": 8125,                               //StatsD port
        "prefix": "topface.Topface.Sockmess.server" //[optional] prefix
    }
};
```

## Usage

1. Run index.js
2. Make http request with port 80 or https request to port 443;
3. GET-param "key" is required. It should contain statistics key name which you want to increment