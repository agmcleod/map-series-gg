const bunyan = require('bunyan')
const config = require('config')
module.exports = bunyan.createLogger({ name: 'map-series-gg', level: config.logger.level })
