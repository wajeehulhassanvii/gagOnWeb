var mongoose = require('mongoose');
var dbURI="mongodb://localhost/gagOnWeb";
var connection = mongoose.connect(dbURI, function(err){
    //username: enigmaticWajeeh    db: xcornerworksw
    if(err)
    {
        console.log("Err");
    } else {
        console.log("Connected To DB");
    }
});

var Schema   =  mongoose.Schema;

var Schema1 = new Schema({
    post_number:Number,
    post_title:{ type: String, default: "Hahaha No Title" },
    post_img: { data: Buffer, contentType: String },
    post_description:{ type: String, default: "No Value" },
   //post_tags:[String],
    created_on:{ type: Date, default: Date.now },
    //created_by:String,
    post_likes: { type: Date, default: 0 }
});

var Schema2= new Schema({
    available_post:Number,
    total_posted:Number
});

var dataHistory = mongoose.model("dataHistory",Schema2);
var posts = mongoose.model("posts",Schema1);

exports.uploading_post = function(req,res){
    posts.create({

        post_number:1,
        post_title:req.body.post_title,
        post_img:req.body.post_image,
        post_description:req.body.post_description,
        created_on:Date.now()

    }, function(err,posts){
        if(!err){
            console.log("Post created and saved: " + posts);
        }
    });

}









mongoose.connection.on('connected', function () {
console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
mongoose.connection.close(function () {
console.log('Mongoose disconnected through app termination');
process.exit(0);
});
});



