const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");
const Core = require("../../core/function");
const core = new Core();

router.get("/query", (req, res) => {
    if (!req.query.domain) {
        res.json({
            status: 2,
            msg: "域名不能为空"
        })
    } else {
        icp(req.query.domain)
            .then(req => {
                res.json({
                    status: 1,
                    info: req
                })
            })
            .catch(req => {
                res.json({
                    status: 3,
                    msg: "获取备案信息失败"
                })
            })
    }
    core.statAdd("icp");
});

function icp(domain) {
    return new Promise((resolve, reject) => {
        let opts = {
            url: "http://icp.chinaz.com/" + domain,
            method: "get",
            headers: {
                "content-type": "text/html"
            }
        }
        request(opts, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                $ = cheerio.load(body);
                if ($("#first p").eq(0).text()) {
                    let name = $("#first p").eq(0).text();
                    name = name.replace("使用高级查询纠正信息", "");
                    let properties = $("#first p").eq(1).text();
                    let icp = $("#first p").eq(2).text();
                    icp = icp.replace("查看截图", "");
                    let title = $("#first p").eq(3).text();
                    let people = $("#first p").eq(4).text();
                    let time = $("#first p").eq(7).text();
                    resolve({
                        name,
                        properties,
                        icp,
                        title,
                        people,
                        time
                    });
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