const express = require("express");
const router = express.Router();
const request = require("request");
const qrDecode = require('qr-decode/server');
const Core = require("../../core/function");
const core = new Core();

router.get("/query", (req, res) => {
    if (!req.query.imgurl) {
        res.json({
            status: 2,
            msg: "图片地址不能为空"
        })
    } else {
        qrdecode(req.query.imgurl)
            .then(req => {
                res.json({
                    status: 1,
                    qrurl: req
                })
            })
            .catch(req => {
                res.json({
                    status: 3,
                    msg: "二维码解析失败"
                })
            })
    }
    core.statAdd("qrdecode");
});

function qrdecode(imgurl) {
    return new Promise((resolve, reject) => {
        let opts = {
            url: imgurl,
            encoding: null
        }

        request.get(opts, function (err, response, body) {
            qrDecode.decodeByBuffer(body).then((res) => {
                resolve(res);

            }).catch(err => {
                reject(err);
            });
        })
    });

};


module.exports = router;