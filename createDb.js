/**
 * Created by okostiuk on 27.03.15.
 */
var elasticsearch = require('elasticsearch');
var Ads = require('./models/ads').Ads;
var mongoose = require('./libs/mongoose');
var async = require('async');

async.series([
    open,
    dropDatabase,
    createAds,
    close

], function(err){
   console.log(arguments);
});

function open(callback){
    mongoose.connection.on('open',callback);
}

function dropDatabase(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function createAds(callback){
    var adses = [
        {advPair: [0, 1], similarity: 60, owner: [1, 0]},
        {advPair: [2, 3], similarity: 65, owner: [0, 0]},
        {advPair: [4, 5], similarity: 40, owner: [1, 0]}
    ];
    async.each(adses,function(adsData, callback){
        var ads = new Ads(adsData);
        ads.save(callback);
    }, callback);
}

function close(callback){
    mongoose.disconnect(callback);
}
