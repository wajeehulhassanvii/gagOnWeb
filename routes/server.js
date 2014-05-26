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
    post_likes: int,
    post_Description:String,
    post_tags:String ,
    img: { data: Buffer, contentType: String }   //herer come new data
});

var Schema_of_post = mongoose.model("Schema_of_post",Schema1);

$("login_button").on("click",function (){
    
});