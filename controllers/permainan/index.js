const Permainan = require("../../models/permainan");
const player = require("../../models/player");

module.exports = {
    store : async (req, res) => {
        try {
            const data = await Permainan.create({
                user_id: req.user.user_id,
            })
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something went wrong" });
        }
    },
    storePlayerDadu : async (req, res) => {
        try {
            const data = await Permainan.findOneAndUpdate({
                user_id: req.user.user_id,
                _id: req.body.permainan_id
            }, {
                $set: {
                    jumlah_pemain: req.body.jumlah_pemain,
                    jumlah_dadu: req.body.jumlah_dadu,
                }
            }, {
                new: true
            })

            for (let i = 0; i < data.jumlah_pemain; i++) {
                let name = "player" + (i + 1);
                await player.create({
                    permainan_id: data._id,
                    name,
                    jumlah_dadu: data.jumlah_dadu
                })
            }
                 
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    findById: async (req, res) => {
        try {
            Permainan
            .findOne({_id: req.params.id}) 
            .populate("players") // key to populate
            .then(user => {
               res.json(user); 
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}