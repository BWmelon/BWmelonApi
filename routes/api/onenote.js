const express = require("express");
const router = express.Router();
const readline = require('readline');
const fs = require("fs");

router.get("/query", (req, res) => {
    onenote(process.cwd() + '/static/files/onenote.txt')
        .then(req => {
            res.json({
                status: 1,
                onenote: req
            })
        })
        .catch(req => {
            res.json({
                status: 3,
                msg: "一言获取失败"
            })
        })
    
});

function onenote(filepath) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(filepath)
        });
        let arr = new Array();
        rl.on('line', (line) => {
            arr.push(line);
        })
        rl.on("close", ()=> {
            if (arr[parseInt(Math.random() * (arr.length - 1), 10)]) {
                resolve(arr[parseInt(Math.random() * (arr.length - 1), 10)]);
            } else {
                reject("failed")
            }
            
        })
    });

};


module.exports = router;