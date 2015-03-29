/**
 * Created by okostiuk on 27.03.15.
 */
//var elasticsearch = require('elasticsearch');
var Ads = require('./models/ads').Ads;
var mongoose = require('./libs/mongoose');
var client = require('./libs/elasticsearch');
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
    var adses = [];
    client.search({//создаем запрос для elasticsearch
        index: 'blog',
        type: 'post',
        body: {
            //_source: 'realty_id',
            query: {
                match: {
                    city_name: "Винница"
                }
            }/*,
             from : 0,
             size : 250*/
        }
    }).then(function (resp) {
        var hits = resp.hits.hits;//Записиваем дпние с дапроса в переменную
        hits.forEach(
            function(itm){
                adses.push({advPair: [//itm._source.realty_id
                    4, 9332342], similarity: Math.random()*100, owner: [1, 0]});
            });
        async.each(adses,function(adsData, callback){
            var ads = new Ads(adsData);
            ads.save(callback);
        }, callback);
    }, function (err) {
        console.trace(err.message);//виводим сообщение об ошибке если не удалось получить ответ от elasticsearch
    });
}

function close(callback){
    mongoose.disconnect(callback);
}

//var adses = require('./models/search.js');


