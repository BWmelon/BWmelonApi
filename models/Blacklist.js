const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);
const BlacklistSchema = new Schema({
    domain: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        default: "系统拉黑"
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = Blacklist = mongoose.model("blacklists", BlacklistSchema);