const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);
const BlacklistSchema = new Schema({
    domain: {
        type: String,
        required: true
    },
    reason: {
        type: Number,
        default: 0//0为系统拉黑，1位手动拉黑
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = Blacklist = mongoose.model("blacklists", BlacklistSchema);