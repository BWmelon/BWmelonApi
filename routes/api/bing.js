const express = require("express");
const router = express.Router();
const request = require("request");

router.get("/:day", (req, res) => {
    if (!req.params.day) {
        res.json({
            status: 3,
            msg: "壁纸日期不能为空"
        })
    } else if (req.params.day < 0 || req.params.day > 7) {
        res.json({
            status: 4,
            msg: "壁纸日期应为0-8"
        })
    } else {
        bing(req.params.day)
            .then(req => {
                res.json({
                    status: 1,
                    bing: req
                })
            })
            .catch(req => {
                res.json({
                    status: 2,
                    msg: "壁纸获取失败"
                })
            })
    }
});

function bing(day) {
    // https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1
    return new Promise((resolve, reject) => {
        let opts = {
            url: "https://cn.bing.com/HPImageArchive.aspx?format=js&n=1&idx=" + day,
            method: "GET",
            headers: {}
        };
        request(opts, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (day >= 0 && day <=7) {
                    let ret = JSON.parse(body)
                    let url = "http://s.cn.bing.net" + ret.images[0].url;
                    let copyright = ret.images[0].copyright;
                    resolve({
                        url,
                        copyright
                    })
                } else {
                    reject({
                        msg: "error",
                    })
                }
            } else {
                reject(error);
            }
        });


    });

};


module.exports = router;