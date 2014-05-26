var mongoose = require('mongoose');

var connection = mongoose.connect("mongodb://localhost/gagOnWeb", function(err){
    if(err)
    {
        console.log("Err");
    } else {
        console.log("Connected To DB");
    }
});

var Schema   =  mongoose.Schema;

var Schema1 = new Schema({
    post_Title:String,
    post_Description:String,
    post_tags:String ,
    img: { data: Buffer, contentType: String }   //herer come new data
});

var Schema_of_postUpload = mongoose.model("Schema_of_postUpload",Schema1);