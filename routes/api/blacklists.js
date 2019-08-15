const express = require("express");
const router = express.Router();
const passport = require("passport");
const Blacklist = require("../../models/Blacklist");




// 添加黑名单域名
router.post("/add", passport.authenticate("jwt", {session:false}), (req,res)=>{
    const blacklistFields = {};
    if(req.body.domain) blacklistFields.domain = req.body.domain;
    if(req.body.reason) blacklistFields.reason = req.body.reason;
    new Blacklist(blacklistFields).save().then(blacklist => {
        res.json(blacklist);
    })
})

// 获取所有黑名单域名
router.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    Blacklist.find()
    .then(blacklist => {
        if(!blacklist){
            return res.status(404).json("没有任何内容");
        }

        res.json(blacklist);
    })
    .catch(err => {res.status(404).json(err)});
})

// 获取单个黑名单域名
router.get("/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    Blacklist.findOne({_id:req.params.id})
        .then(blacklist => {
            if (!blacklist) {
                return res.status(404).json("没有任何内容");
            }

            res.json(blacklist);
        })
        .catch(err => {
            res.status(404).json(err)
        });
})

// 编辑黑名单域名
router.post("/edit/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    const blacklistFields = {};
    if (req.body.domain) blacklistFields.domain = req.body.domain;
    if (req.body.reason) blacklistFields.reason = req.body.reason;
    Blacklist.findOneAndUpdate(
        {_id:req.params.id},
        {$set:blacklistFields},
        {new: true}
    ).then(blacklist => {res.json(blacklist)});
})

// 删除单个黑名单域名
router.delete("/delete/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    Blacklist.findOneAndRemove({_id:req.params.id})
    .then(blacklist => {
        blacklist.save().then(blacklist => res.json(blacklist))
    })
    .catch(err => res.status(404).json("删除失败"))
})

module.exports = router;
