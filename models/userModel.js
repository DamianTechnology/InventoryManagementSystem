const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true , 
        match: [
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please use a valid email address"
  ]
     },
    password: { type: String, required: true,
         match: [
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number"
  ]
     },
    role:{type:String, enum:['admin', 'salesperson', 'storekeeper'],default:'salesperson'},
    phone:{type:String,required:true},

    }, { timestamps: true });

module.exports = mongoose.model('user', userSchema);