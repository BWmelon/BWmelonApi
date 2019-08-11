//调用次数查询
const express = require("express");
const router = express.Router();
const Core = require("../../core/function");
const core = new Core();

router.get("/", (req, res) => {
    
    core.statQuery()
        .then(stat => {
            tinyurl = stat.hasOwnProperty("tinyurl") ? stat.tinyurl : 0;
            longurl = stat.hasOwnProperty("longurl") ? stat.longurl : 0;
            qrcode = stat.hasOwnProperty("qrcode") ? stat.qrcode : 0;
            qrdecode = stat.hasOwnProperty("qrdecode") ? stat.qrdecode : 0;
            sitetitle = stat.hasOwnProperty("sitetitle") ? stat.sitetitle : 0;
            icp = stat.hasOwnProperty("icp") ? stat.icp : 0;
            cloudmusic = stat.hasOwnProperty("cloudmusic") ? stat.cloudmusic : 0;
            qqinfo = stat.hasOwnProperty("qqinfo") ? stat.qqinfo : 0;
            onenote = stat.hasOwnProperty("onenote") ? stat.onenote : 0;
            bing = stat.hasOwnProperty("bing") ? stat.bing : 0;
            res.json({
                tinyurl,
                longurl,
                qrcode,
                qrdecode,
                sitetitle,
                icp,
                cloudmusic,
                qqinfo,
                onenote,
                bing
            })
        })
        .catch(err => {
            console.log(err);
        })
});




module.exports = router;