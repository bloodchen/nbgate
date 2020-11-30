// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
//const fileUpload = require("express-fileupload");
require('dotenv').config();

const nbMgr = require("./nbweb_mgr.js");
const bitfs = require("./bitfs.js");
const ipfs = require("./ipfs.js");


// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

/*app.use(
  fileUpload({
    createParentPath: true,
    debug: true,
    limits: {
      fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    }
  })
); */
/*app.use(function(req, res, next) {
  if (req.originalUrl.slice(-5) === '.test') {
     var fullUrl = req.originalUrl;
    console.log("xxxx:"+req.originalUrl);
    //res.end(fullUrl);
    req.url = req.originalUrl+"/";
    res.redirect(302, req.url);
    
  }
  next();
});
*/
app.get("/bitfs/*", async (req, res) => {
  //response.sendFile(__dirname + "/views/index.html");
  console.log(req.path);
  let handled = await bitfs.handle_Data(res, req.path.slice(6));
  if (handled == false) {
    res.end("bitfs not found");
  }
});
app.get("/ipfs/*", async (req, res) => {
  //response.sendFile(__dirname + "/views/index.html");
  console.log("ipfs path="+req.path);
  let handled = await ipfs.handle_Data(res, req.path.slice(5));
  if (handled == false) {
    res.end("ipfs not found");
  } 
});

// https://expressjs.com/en/starter/basic-routing.html
function get_tld_path(tld,url){
  let arr = url.split('/');
  let tld_len = tld.length;
  console.log(arr);
  let tld_pos = 0;
  for(let i=0;i<arr.length;i++){
    if(arr[i].slice(-tld_len)===tld){
      tld_pos = i;
    }
  }
  let path = arr[tld_pos];
  for(let j=tld_pos+1;j<arr.length;j++){
    path+="/"+arr[j];
  }
  return path;
} 
app.get("/_mark",async (req,res)=>{
  res.sendFile(__dirname+"/template/text.html");  
})

app.get("/*", async (req, res) => {
  if(req.path=="/"){
    res.sendFile(__dirname + "/views/index.html");
    return;
  }
  let path = decodeURIComponent(req.path);
  console.log(path);
  const url = path.slice(1);
  console.log("url=",url);
  if(url.indexOf('.test')!=-1||url.indexOf('.b')!=-1)
  {
    
    //const tld_path = get_tld_path(".test",req.path);
    //console.log("tld_path="+tld_path);
    const tld_path = url;
    nbMgr.handleURL(res,tld_path);
  }else{
      res.end("ok");
    }
});

//handle file uploads
app.post("/upload", async (req, res) => {
  let path = req.body.path;

  console.log("in upload: " + path);
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded"
      });
    } else {
      console.log(req.files);
      let data = [];
      let item = req.files.item;
      console.log("in upload:" + item.name);
      //move photo to uploads directory
      item.mv(__dirname + "/uploads/" + path);

      //push file details
      data.push({
        name: item.name,
        mimetype: item.mimetype,
        size: item.size
      });

      //return response
      res.send({
        status: true,
        message: "Files are uploaded",
        data: data
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
