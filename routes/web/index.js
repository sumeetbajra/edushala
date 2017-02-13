var rs = require('../../misc/rs');

module.exports = function (ctx) {
    require('./all')(ctx);
    require('./auth')(ctx);
    require('./secure')(ctx);
    require('./teach')(ctx);
};