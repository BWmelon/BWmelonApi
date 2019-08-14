const express = require("express");
const router = express.Router();
const request = require("request");
const Core = require("../../core/function");
const core = new Core();

router.get("/:qq", (req, res) => {
    if (!req.params.qq) {
        res.json({
            status: 3,
            msg: "QQ号不能为空"
        })
    } else {
        qqinfo(req.params.qq)
            .then(req => {
                res.json({
                    status: 1,
                    qqinfo: req
                })
            })
            .catch(req => {
                res.json({
                    status: 2,
                    msg: req
                })
            })
    }
    core.statAdd("qqinfo");
});

function qqinfo(qq) {
    // http://q1.qlogo.cn/g?b=qq&s=640&nk=qq
    // http://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=qq
    return new Promise((resolve, reject) => {
        let opts = {
            url: "http://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=" + qq,
            method: "GET",
            headers: {
            }
        };
        request(opts, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (body.indexOf("error") == -1) {
                    let nickname = body;
                    nickname = nickname.replace(nickname.slice(0, 17), "");
                    nickname = nickname.replace(nickname.slice(-1), "");
                    let obj = JSON.parse(nickname);
                    resolve({
                        nickname: obj[qq][6],
                        qqavatar: "http://q1.qlogo.cn/g?b=qq&s=640&nk=" + qq
                    })
                } else {
                    reject({
                        msg: "号码输入错误",
                    })
                }
            } else {
                reject(error);
            }
        });

        
    });

};


module.exports = router;