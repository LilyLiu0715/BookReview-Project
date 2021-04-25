const mongoose=require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema= new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: String,
	firstName: String,
	lastName: String,
	// favoriteGenres: String,
	email: { type: String, unique: true, required: true },
	isAdmin: { type: Boolean, default: false }
});



UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("users", UserSchema);