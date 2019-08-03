const express = require("express");
const router = express.Router();
const request = require("request");


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
                    msg: "短网址生成失败"
                });
            })
    }
});

function urlcn(url) {
    //原api http://sa.sogou.com/gettiny?url=
    return new Promise((resolve, reject) => {

        let opts = {
            url: "https://sa.sogou.com/gettiny?url=" + url,
            method: "GET",
            headers: {
                "content-type": "text/plain",
            },
        };
        request(opts, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let tinyurl = body;
                resolve(tinyurl);
            } else {
                reject(error);
            }
        });
    });

};

function tcn(url) {
    //原api https://api.weibo.com/2/short_url/shorten.json?source=2849184197&url_long=
    return new Promise((resolve, reject) => {
        let option = {
            url: "https://api.weibo.com/2/short_url/shorten.json?source=2849184197&url_long=" + url,
            method: "GET",
            json: true,
            headers: {
                "content-type": "application/json",
            },
        };
        request(option, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                tinyurl = body.urls[0].url_short;
                tinyurl = tinyurl.replace(/http/, "https");
                resolve(tinyurl);
            }
        });
    });

};

module.exports = router;