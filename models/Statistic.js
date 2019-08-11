const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatisticSchema = new Schema({
    api: {
        type:String,
        required: true
    },
    time: {
        type: Number,
        default: 1
    }
})

module.exports = Statistic = mongoose.model("statistics", StatisticSchema);