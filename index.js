const express = require("express");
const cors = require('cors');
const app = express();
const path = require('path')
app.use(cors());
app.use("/", express.static(path.join(__dirname, 'public')))


const tinyurl = require("./routes/api/tinyurl");
const longurl = require("./routes/api/longurl");
const qrdecode = require("./routes/api/qrdecode");
const qrcode = require("./routes/api/qrcode");
const qqinfo = require("./routes/api/qqinfo");
const sitetitle = require("./routes/api/sitetitle");
const icp = require("./routes/api/icp.js");
const onenote = require("./routes/api/onenote.js");
const bing = require("./routes/api/bing.js");

app.use("/api/tinyurl", tinyurl);
app.use("/api/longurl", longurl);
app.use("/api/qrdecode", qrdecode);
app.use("/api/qrcode", qrcode);
app.use("/api/qqinfo", qqinfo);
app.use("/api/sitetitle", sitetitle);
app.use("/api/icp", icp);
app.use("/api/onenote", onenote);
app.use("/api/bing", bing);

 

const port = 3000;
app.listen(port, () => {
    console.log(`Sever running on port ${port}`);
});