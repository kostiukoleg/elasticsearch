/**
 * Created by okostiuk on 29.03.15.
 */
var client = require('../libs/elasticsearch');

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
    var adses = [];
    hits.forEach(
        function(itm){
            adses.push({advPair: [//itm._source.realty_id
            2, 9332342], similarity: Math.random()*100, owner: [1, 0]});
        });
    module.exports =  adses;
}, function (err) {
    console.trace(err.message);//виводим сообщение об ошибке если не удалось получить ответ от elasticsearch
});