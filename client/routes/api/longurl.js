const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");
const Core = require("../../core/function");
const core = new Core();

router.get("/query", (req, res) => {
    if (!req.query.tinyurl) {
        res.json({
            status: 2,
            msg: "短网址不能为空"
        })
    } else {
        longurl(req.query.tinyurl)
            .then(req => {
                res.json({
                    status: 1,
                    longurl: req
                })
            })
            .catch(req => {
                res.json({
                    status: 3,
                    msg: "短网址还原失败"
                })
            })
    }
    core.statAdd("longurl");
});

function longurl(tinyurl) {
    return new Promise((resolve, reject) => {
        let opts = {
            url: "https://duanwangzhihuanyuan.51240.com/web_system/51240_com_www/system/file/duanwangzhihuanyuan/get/?ajaxtimestamp=" + new Date().getTime(),
            method: "POST",
            form: {
                turl: tinyurl
            },
            headers: {
                "content-type": "text/html"
            }
        }
        request(opts, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                $ = cheerio.load(body);
                if ($("a").text()) {
                    resolve($("a").text());
                } else {
                    reject("failed");
                }
            } else {
                reject(error);
            }
        })
    });

};


module.exports = router;