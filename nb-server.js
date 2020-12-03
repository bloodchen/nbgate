const express = require("express");
const app = express();

require("dotenv").config();

const nbMgr = require("./nbweb_mgr.js");
const bitfs = require("./bitfs.js");
const ipfs = require("./ipfs.js");

app.use(express.static("public"));

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
  console.log("ipfs path=" + req.path);
  let handled = await ipfs.handle_Data(res, req.path.slice(5));
  if (handled == false) {
    res.end("ipfs not found");
  }
});

app.get("/_mark", async (req, res) => {
  res.sendFile(__dirname + "/template/text.html");
});

app.get("/*", async (req, res) => {
  if (req.path == "/") {
    res.sendFile(__dirname + "/views/index.html");
    return;
  }
  let path = decodeURIComponent(req.path);
  console.log(path);
  const url = path.slice(1);
  console.log("url=", url);
  if (url.indexOf(".test") != -1 || url.indexOf(".b") != -1) {
    const tld_path = url;
    nbMgr.handleURL(res, tld_path);
  } else {
    res.end("ok");
  }
});



// listen for requests :)
const port = process.env.PORT ? process.env.PORT : 3000;
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
