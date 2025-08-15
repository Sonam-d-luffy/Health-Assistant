import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
name: {
  type: String,
  trim: true,         // keep it clean
  default: "Unnamed"  // fallback if not provided
},
label : String,

   location: {
    latitude : {type : Number},
    longitude : {type : Number}
  },
  address : {
    type : String
  },
  selected : {
    type : Boolean,
    default : false
  }

})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  addresses : [addressSchema]
 
});

const User = mongoose.model("User", userSchema);

export default User;
