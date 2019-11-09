const express = require("express");
const router = express.Router();
const request = require("request");
const Core = require("../../core/function");
const core = new Core();


router.get("/urlcn", (req, res) => {
    if (!req.query.longurl) {
        res.json({
            status: 2,
            msg: "长网址不能为空"
        })
    } else {
        urlcn(req.query.longurl)
            .then((req) => {
                res.json({
                    status: 1,
                    tinyurl: req
                });
            })
            .catch((err) => {
                res.json({
                    status: 3,
                    msg: "短网址生成失败"
                });
            })
    }
    core.statAdd("tinyurl");
});

router.get("/tcn", (req, res) => {
    if (!req.query.longurl) {
        res.json({
            status: 2,
            msg: "长网址不能为空"
        })
    } else {
        tcn(req.query.longurl)
            .then(function (req) {
                res.json({
                    status: 1,
                    tinyurl: req
                });
            })
            .catch((err) => {
                res.json({
                    status: 3,
                    msg: "短网址生成失败(新浪短网址现已失效)"
                });
            })
    }
    core.statAdd("tinyurl");
});

function urlcn(url) {
    //原api http://sa.sogou.com/gettiny?url= (已失效)
    //原api http://dwz.fxw.la/url/url.php?

    return new Promise((resolve, reject) => {

        let opts = {
            url: "http://dwz.fxw.la/url/url.php?" + url,
            method: "GET",
            headers: {
                "content-type": "text/plain",
            },
        };
        request(opts, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let tinyurl = JSON.parse(body);
                tinyurl = tinyurl['url_short'];
                tinyurl = tinyurl.replace(/http/, "https");      
                resolve(tinyurl);
            } else {
                reject(error);
            }
        });
    });

};

function tcn(url) {
    //原api https://api.t.sina.com.cn/short_url/shorten.json?source=2849184197&url_long=
    return new Promise((resolve, reject) => {
        let option = {
            url: "https://api.t.sina.com.cn/short_url/shorten.json?source=2849184197&url_long=" + url,
            method: "GET",
            json: true,
            headers: {
                "content-type": "application/json",
            },
        };
        request(option, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                tinyurl = body[0].url_short;
                tinyurl = tinyurl.replace(/http/, "https");
                resolve(tinyurl);
            }
        });
    });

};

module.exports = router;