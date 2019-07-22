const http = require("http");
const url = require("url");
const request = require("request");
const querystring = require("querystring");

let server = http.createServer((req, res) => {
    let pathname = url.parse(req.url, true);
    let arg = url.parse(req.url).query;
    let params = querystring.parse(arg);
    let longurl = params.url;
    console.log(params);
    switch (pathname.pathname) {
        case '/tinyurl/urlcn':
            urlcn(longurl).then(function (req) {
                req = {
                    tinyurl: req,
                    type: "urlcn"
                };
                if (pathname.query && pathname.query.callback) {
                    var str = pathname.query.callback + '(' + JSON.stringify(req) + ')';
                    res.end(str);
                } else {
                    res.end(JSON.stringify(req));
                }
            })
            break;
        case '/tinyurl/tcn':
            tcn(longurl).then(function (req) {
                req = {
                    tinyurl: req,
                    type: "tcn"
                };
                if (pathname.query && pathname.query.callback) {
                    var str = pathname.query.callback + '(' + JSON.stringify(req) + ')';
                    res.end(str);
                } else {
                    res.end(JSON.stringify(req));
                }
            })
            break;
        case '/tinyurl/dwzcn':
            res.end('dwzcn');
            break;
        default:
            let req = {
                error: "This generation method does not exist"
            };
            if (pathname.query && pathname.query.callback) {
                var str = pathname.query.callback + '(' + JSON.stringify(req) + ')';
                res.end(str);
            } else {
                res.end(JSON.stringify(req));
            }
            break;
    }
});

function urlcn(url) {
    //原api http://sa.sogou.com/gettiny?url=
    return new Promise((resolve, reject) => {

        let option = {
            url: "http://sa.sogou.com/gettiny?url=" + url,
            method: "GET",
            headers: {
                "content-type": "text/plain",
            },
        };
        request(option, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let tinyurl = body;
                resolve(tinyurl);
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

server.listen(3000);