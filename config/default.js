module.exports = {
  "port":27017,
  "mongoose": {
    "uri": "mongodb://127.0.0.1:27017/ads",
    "options": {
      "server": {
        "socketOptions": {
          "keepAlive": 1
        }
      }
    }
  }
}