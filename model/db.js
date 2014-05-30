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



// var Schema3=new Schema({
//     email:String,
//     secretText:String,
//     password:String
// });


var Schema2= new Schema({
    available_post:{type:Number, default:0},
    total_posted:{type:Number, default:0}
});



//var users = mongoose.model("users",Schema3);
var dataHistory = mongoose.model("dataHistory",Schema2);
var posts = mongoose.model("posts",Schema1);

exports.uploading_post = function(req,res){
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

            

    //take total post count from database and put it in a variable the add 1 to it then 
    // (goto *here1) and post it to database and for (goto *here2) use the algorith I defined
    // in postLoad.js to create dynamic ID name as (Img-000   --- > Imt-999) since our website is for 1000
    // post only, which we will use to find post and append to 5 divs in our page   



    var total_posts_from_db=0;
    //working fine with count
    posts.count({}, function( err, count){

        dataHistory.count({},function(err,dataCount){
            dataHistory.create({
                total_posted:dataCount+1,
                available_post:count
            },function(err,dataHistory){
                console.log("data History is :" + dataHistory);
            })
        }
        )


        // // updating database with total post uploaded and available post
        // dataHistory.create({
        //     available_post:count,
        //     total_posted:Number
        // }, function(err,data_history)
        // {
        //     if(!err){
        //         console.log("dataHistory updated: " + data_history);
        //     }
        // });

        posts.create({  // post uploading

        post_number:count + 1, // *here1 and send it to server as post number
    //    img_name: *here2
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
    );   // post.create ends here


    console.log( "Number of users:", count );
    total_posts_from_db=count;
    console.log( "Number of users:", total_posts_from_db );
 })

   
    


    res.redirect('admin',
        {   'myid': "asd",
            'page_element': "<br><br><br><div id='uploadForm'><form method='post' enctype='multipart/form-data' name='postUpload' action='/post_upload' ><br><br><input type='text' id='post_title' name='post_title' placeholder='Post Title'><br><br><input type='text' id='post_description' name='post_description' placeholder='Post Description'><br><br><input type='file' id='thumbnail' name='thumbnail' placeholder='Browse Image'><br><br><button>Post Image</button></form></div>"
        }
     ,function(){
        console.log('redirecting to admin');
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



