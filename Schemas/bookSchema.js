// const mongoose=require("mongoose");
// const BookSchema= new mongoose.Schema({
// 	book_id: { type: Number, unique: true, required: true },
//     	name: { type: String, required: true },
//     	author: { type: String, required: true },
//     	user_id: { type: Number, required: true }, // { type: Schema.Types.ObjectId, ref: 'User' },
// 	genre: { type: String, required: true },
// 	image: { data: Buffer, contentType: String },
//     	introduction: { type: String, required: true },
//     	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
// });
//
// module.exports = mongoose.model("Book", BookSchema);
const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const BookSchema= new mongoose.Schema({
	ISBN: String,
	name: String,
	// author: String,
	user:{
		id:{
		 type:mongoose.Schema.Types.ObjectId,
		 ref:"users"
		},
		username:String,
	 },
	genre: String,
	image: String,
	introduction: String,
	comments: [
		{id: {
				type: Schema.Types.ObjectId,
				ref: 'Comment'
			}}
	]
});

module.exports = mongoose.model("books", BookSchema);
