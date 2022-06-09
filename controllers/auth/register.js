const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
        try {
            const { first_name, last_name, email, password } = req.body;
        
            if (!(email && password && first_name && last_name)) {
              res.status(400).send("All input is required");
            }
        
            const oldUser = await User.findOne({ email });
        
            if (oldUser) {
              return res.status(409).send("User Already Exist. Please Login");
            }
        
            encryptedPassword = await bcrypt.hash(password, 10);
        
            const user = await User.create({
              first_name,
              last_name,
              email: email.toLowerCase(), 
              password: encryptedPassword,
            });
        
            // Create token
            const token = jwt.sign(
              { user_id: user._id, email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );
            // save user token
            user.token = token;
        
            // return new user
            res.status(201).json(user);
          } catch (err) {
            console.log(err);
            res.status(500).json({message : "Something went wrong"});
          }
    }
  }