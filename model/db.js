var mongoose = require('mongoose');
var fs=require('fs');
var path=require('path');

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
    post_title:{ type: String, default: "Hahaha No Title, admin is a jerk" },
    post_img: { data: Buffer, contentType: String },
    post_description:{ type: String, default: "No Value" },
   //post_tags:[String],
    created_on:{ type: Date, default: Date.now },
    //created_by:String,
    post_likes: { type: Number, default: 0 }
});

var Schema2= new Schema({
    available_post:Number,
    total_posted:Number
});

var dataHistory = mongoose.model("dataHistory",Schema2);
var posts = mongoose.model("posts",Schema1);

exports.uploading_post = function(req,res){
<<<<<<< HEAD
    
    console.log(req);
//    var image_path=fs.files.post_image.path;
  //  alert(image_path);
=======
    var fs = require('fs');
    var path = require('path');//node module for filing

    var path1 = req.files.thumbnail.path;
    console.log(path1);

    var a =  path.extname(path1);
    console.log(a);

        var tmp_path = req.files.thumbnail.path;
        var   imgpth =  tmp_path.replace('ForwardSlash', '/');
        tmp_path=  tmp_path.replace('/', 'ForwardSlash');
        var target_path = '/public/img/' + req.files.thumbnail.name;
        console.log(imgpth);

               /* posts.post_img.data = fs.readFileSync(imgpth);
                posts.post_img.contentType = 'image/png';
              posts.save(function (err, a)
                {
                    if (err) throw err;

                    console.error('saved img to mongo');


                    fs.unlink(imgpth, function()
                    {
                        console.log("File is deleted");

                    });

                })
                res.render('Saved');*/

>>>>>>> 7a3b7cbc8fe30aec4e6273f411b79ab5eb765de1



    posts.create({

        post_number:1,
        post_title:req.body.post_title,
        "post_img.data": fs.readFileSync(imgpth),
        "post_img.contentType" : 'image/png',
        "post_description":req.body.post_description,
        created_on:Date.now()

    }, function(err,posts)
    {
        if(!err){
            console.log("Post created and saved: " + posts);
        }
    }
    );

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



