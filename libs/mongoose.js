/**
 * Created by okostiuk on 27.03.15.
 */
var mongoose = require('mongoose');
var config = require('config');
mongoose.connect(config.mongoose.uri);
module.exports = mongoose;
