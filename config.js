var fs = require('fs');
var util = require('util');

/**
 * Занимается загрузкой конфига
 */
var Config = {};

/**
 * Грузит файл конфига
 *
 * Если конфиг не найден или не удалось загрузить, выводит ошибку и завершает
 * программу.
 *
 * @param string instanceName Название инстанса
 * @return object Конфиг
 */
Config.readConfig = function(instanceName) {
    var configPath = Config._getConfigPath();
    if (!configPath) {
        util.error("ERROR: config file config.js' must exist either in ~/.statsdproxy or /etc/statsdproxy.");
        util.error("An example config file can be found in scripts/etc/statsdproxy/config.js in the StatsDProxy directory.");
        process.exit(1);
    }

    try {
        var config = require(configPath);
        return config;
    } catch (error) {
        util.error("ERROR: could not load config file '" + configPath +"' because:\n" + error.stack);
        process.exit(1);
    }
};

/**
 * Определяет путь к файлу конфига, проверяя по очереди существование юзерского
 * и глобального конфига
 * @return string|boolean Путь к конфигу, или false, если никакой конфиг не найден
 */
Config._getConfigPath = function() {
    if (process.env.HOME) {
        var userConfigPath = process.env.HOME + '/.statsdproxy/config.js';
        if (fs.existsSync(userConfigPath)) {
            return userConfigPath;
        }
    }

    var globalConfigPath = '/etc/statsdproxy/config.js';
    if (fs.existsSync(globalConfigPath)) {
        return globalConfigPath;
    }

    return false;
};

module.exports = Config;
