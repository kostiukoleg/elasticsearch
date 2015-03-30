/**
 * Created by okostiuk on 25.03.15.
 */
var elasticsearch = require('elasticsearch');
var client = require('./libs/elasticsearch');
var natural = require('natural');
var co = require('co');

function comparisonNumber(num1,num2){
    var res;
    if (num1>=num2){
        res = (num2/(num1/100)-100);
    } else {
        res = (num1/(num2/100)-100);
    }
    return 100-Math.abs(res);
}

function comparisonString(str1,str2){
    var res = natural.JaroWinklerDistance(str1,str2);
    return res*100;
}

function* elasticSearch(id){
    return client.search({
        index: 'search_index',
        type: 'search_type',
        body:{
            "query": {
                "bool": {
                    "must": [
                        {
                            "term": {
                                "search_type.realty_id": id
                            }
                        }
                    ],
                    "must_not": [ ],
                    "should": [ ]
                }
            },
            "from": 0,
            "size": 10,
            "sort": [ ],
            "facets": { }
        }
    })
}

function* searchAds(id){
    var resp = yield elasticSearch(id);
    //console.log(resp);
    var hits = resp.hits.hits;
    var res = [];
    hits.forEach(function(itm){
        res.push(itm._source);
    });
    return res;
}
var a = 9004019;
var b = 9731481;
co(function *(){
    var res1 = yield searchAds(a);
    var res2 = yield searchAds(b);
    //console.log(res1[0].description);
    console.log(comparisonString(res1[0].description,res2[0].description));
    console.log(comparisonString(res1[0].rooms_count,res2[0].rooms_count));
}).catch(onerror);

function onerror(err) {
    console.error(err.stack);
}