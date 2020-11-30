const axios = require("axios");
const u = require('./util.js');
const endpoint = "https://x.bitfs.network";

class bitfs{
  static async handle_Data(res, path){
    let url = endpoint+path;
    try {
      let res1 = await axios.get(url,{
        method: "GET",
        responseType: "stream"});
      //console.log(res1.headers);
      res.set(res1.headers);
      let ct = res1.headers['content-type'];
      if(ct.indexOf("text/html")==-1)
        res1.data.pipe(res);
      else{
        let str = await u.readableToString(res1.data);
        let data = u.parse_data(str);
        console.log(data);
        res.end(data);
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = bitfs;