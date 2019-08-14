const StatisticSchema = require("../models/Statistic");
const mongoose = require("mongoose");

function Core() {
    // 使用次数统计
    this.statAdd = function (api) {
        mongoose.set('useFindAndModify', false);
        Statistic.findOne({
                api
            })
            .then(exist => {
                if (exist) {
                    let time = ++exist.time;
                    Statistic.findOneAndUpdate({
                            api
                        }, {
                            api,
                            time: time
                        })
                        .then(statistic => {
                            // console.log(statistic)
                        })
                        .catch(err => {
                            // console.log(err)
                        });


                } else {
                    const newStatistic = new StatisticSchema({
                        api,
                        time: 1
                    })
                    newStatistic.save()
                        .then(statistic => {
                            // console.log(statistic)
                        })
                        .catch(err => {
                            // console.log(err)
                        });
                }
            });
    }

    // 使用次数查询
    this.statQuery = function () {
        return new Promise((res, rej) => {
            mongoose.set('useFindAndModify', false);
            Statistic.find({})
                .then(exist => {
                    let arr = {};
                    for (const api in exist) {
                        if (exist.hasOwnProperty(api)) {
                            const apiName = exist[api].api;
                            const apiTime = exist[api].time;
                            arr[apiName] = apiTime;
                        }
                    }
                    res(arr);
                })
                .catch(err => rej(err));
        })
            
    }
}

module.exports = Core;