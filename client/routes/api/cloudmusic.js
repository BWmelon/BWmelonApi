const express = require("express");
const router = express.Router();
const NeteaseMusic = require("simple-netease-cloud-music");
const nm = new NeteaseMusic()
const Core = require("../../core/function");
const core = new Core();


// 歌曲搜索
router.get("/search/:key", (req, res) => {
    if (!req.params.key) {
        res.json({
            status: 2,
            msg: "搜索词不能为空"
        })
    } else {
        nm.search(req.params.key).then(data => {
            if (data.result.songCount) {
                // 歌曲名
                let results = [];
                for (const i in data.result.songs) {
                    if (data.result.songs.hasOwnProperty(i)) {                      
                        const name = data.result.songs[i].name;
                        const id = data.result.songs[i].id;
                        // 作者
                        let artist = [];
                        for (const j in data.result.songs[i].ar) {
                            if (data.result.songs[i].ar.hasOwnProperty(j)) {
                                const element = data.result.songs[i].ar[j].name;
                                const arr = {
                                    "name": element
                                };
                                artist.push(arr);
                            }
                        }
                        results.push({
                            name,
                            id,
                            artist
                        });
                    }
                }
                res.json({
                    status: 1,
                    results
                })
            } else {
                res.json({
                    status: 3,
                    msg: "歌曲获取失败"
                })
            }
        })
    }
    core.statAdd("cloudmusic");
});



// 歌曲url获取
router.get("/url/:id", (req, res) => {
    if (!req.params.id) {
        res.json({
            status: 2,
            msg: "歌曲id不能为空"
        })
    } else {
        nm.url(req.params.id).then(data => {
            if(data.data[0].url) {
                res.json({
                    status: 1,
                    musicurl: data.data[0].url
                })
            } else {
                res.json({
                    status: 3,
                    msg: "url获取失败"
                })
            }
        })
    }
    core.statAdd("cloudmusic");
});

// 歌曲信息获取
router.get("/info/:id", (req, res) => {
    if (!req.params.id) {
        res.json({
            status: 2,
            msg: "歌曲id不能为空"
        })
    } else {
        nm.song(req.params.id).then(data => {
            if (data.songs.length) {
                let artist = [];
                for (const i in data.songs[0].ar) {
                    if (data.songs[0].ar.hasOwnProperty(i)) {
                        const element = data.songs[0].ar[i].name;
                        const arr = {"name": element};
                        artist.push(arr);
                    }
                }               
                res.json({
                    status: 1,
                    musicinfo: {
                        name: data.songs[0].name,
                        artist: artist
                    }
                })
            } else {
                res.json({
                    status: 3,
                    msg: "歌曲获取失败"
                })
            }
        })
    }
    core.statAdd("cloudmusic");
});



// 歌曲歌词获取
router.get("/lyric/:id", (req, res) => {
    if (!req.params.id) {
        res.json({
            status: 2,
            msg: "歌曲id不能为空"
        })
    } else {
        nm.lyric(req.params.id).then(data => {
            if(!data.uncollected) {      
                res.json({
                    status: 1,
                    musiclyric: data.lrc.lyric
                })
            } else {
                res.json({
                    status: 3,
                    msg: "歌词获取失败"
                })
            }
        })
    }
    core.statAdd("cloudmusic");
});


// 歌单列表获取
router.get("/playlist/:id", (req, res) => {
    if (!req.params.id) {
        res.json({
            status: 2,
            msg: "歌单id不能为空"
        })
    } else {
        nm.playlist(req.params.id).then(data => {
            if (data.code = 200) {
                // 歌曲名
                let results = [];
                for (const i in data.playlist.tracks) {
                    if (data.playlist.tracks.hasOwnProperty(i)) {
                        const name = data.playlist.tracks[i].name;
                        const id = data.playlist.tracks[i].id;
                        // 作者
                        let artist = [];
                        for (const j in data.playlist.tracks[i].ar) {
                            if (data.playlist.tracks[i].ar.hasOwnProperty(j)) {
                                const element = data.playlist.tracks[i].ar[j].name;
                                const arr = {
                                    "name": element
                                };
                                artist.push(arr);
                            }
                        }
                        results.push({
                            name,
                            id,
                            artist
                        });
                    }
                }
                res.json({
                    status: 1,
                    results
                })
            }   
        })
    }
    core.statAdd("cloudmusic");
});

module.exports = router;