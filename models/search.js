/**
 * Created by okostiuk on 29.03.15.
 */
var client = require('../libs/elasticsearch');

exports.Client = client.search({
    index: 'search_index',
    type: 'search_type',
    body: {
        _source: 'realty_id',
        query: {
            match: {
                city_name: "Винница"
            }
        },
        from : 0,
        size : 250
    }
}).then(function (resp) {
    var hits = resp.hits.hits;
    var adses = [];
    hits.forEach(
        function(itm){
            adses.push({advPair: [itm._source.realty_id, 9332342], similarity: Math.random()*100, owner: [1, 0]});
        }
    );
    return adses;
}, function (err) {
    console.trace(err.message);
});