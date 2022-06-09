const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const playerSchema = new Schema({
  permainan_id: { type: ObjectId, ref: "Permainan", required: true },
  name: { type: String, default: null },
  jumlah_dadu: { type: Number, default: null },
});

module.exports = mongoose.model("Player", playerSchema);
