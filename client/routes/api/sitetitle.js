const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");
const Core = require("../../core/function");
const core = new Core();

router.get("/query", (req, res) => {
    if (!req.query.url) {
        res.json({
            status: 2,
            msg: "网址不能为空"
        })
    } else {
        let url = req.query.url.indexOf("http") != -1 ? req.query.url : "http://" + req.query.url;
        longurl(url)
            .then(req => {
                res.json({
                    status: 1,
                    title: req
                })
            })
            .catch(req => {
                res.json({
                    status: 3,
                    msg: "获取网站标题失败"
                })
            })
    }
    core.statAdd("sitetitle");
});

function longurl(url) {
    return new Promise((resolve, reject) => {
        let opts = {
            url: url,
            method: "get",
            headers: {
                "content-type": "text/html"
            }
        }
        request(opts, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                $ = cheerio.load(body);
                let title = $("title").text();
                if (title) {
                    resolve(title);
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