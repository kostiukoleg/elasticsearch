/**
 * Created by okostiuk on 27.03.15.
 */
var crypto = require('crypto');
var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;
var schema = new Schema({
    advPair: {
        type: Array,
        required: true
    },
    similarity: {
        type: Number,
        required: true
    },
    owner: {
        type: Array,
        required: true
    }
});
exports.Ads = mongoose.model('Ads', schema);
