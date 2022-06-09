const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const permainanSchema = new Schema({
  user_id: { type: ObjectId, ref: "user", required: true },
  jumlah_pemain: { type: Number, default: null },
  jumlah_dadu: { type: Number, default: null },
  status: { type: Number, default: 0 },
  players: [{ 
        type: ObjectId,
        ref: "Player"
    }]
});

module.exports = mongoose.model("Permainan", permainanSchema);