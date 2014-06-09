var mongoose = require('mongoose');
var fs=require('fs');
var path=require('path');
var Twit = require('twit');


//Twitter authentication

// var T = new Twit({
//     consumer_key:         '...'
//   , consumer_secret:      '...'
//   , access_token:         '...'
//   , access_token_secret:  '...'
// })

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
    //post_number:Number,
    post_title:{ type: String, default: "Hahaha No Title, admin is a jerk" },
    post_img: { data: Buffer, contentType: String },
  //  post_description:{ type: String, default: "No Value" },
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
    availability:{type:Boolean, default:true},
    total_posted:{type:Number, default:0}
});



//var users = mongoose.model("users",Schema3);
var dataHistory = mongoose.model("dataHistory",Schema2);
var posts = mongoose.model("posts",Schema1);

exports.tweet = function(req,res){
    // 

    T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
      console.log("data sent by server: "+data)
    })
    
};



exports.page_first_visit = function (req,res){
    //fetch first posts in 0-4 index
    //fetch 3 top likes posts in 5-7 index
    //fetch 3 random posts in 8-10
    //fetch 5 random title in 11-15
    var dataOfServer= [];

    function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    // put 5 latest posts
   

        posts.find(
            {},
            function(err,dataPost){
                    if(!err){
                    for(var i =0,j=dataPost.length-1;i<5;i++,j--){
                        dataOfServer[i]=dataPost[j];
                        console.log("first five "+(i)+" :"+dataOfServer[i]);
                    }
                    
                    // dataOfServer start from 5 to 7
                    // put most liked posts or top -3
                    posts.find(
                            {},
                            null,
                            {sort: {post_likes : -1}}, // descending
                            function(err, LikedPosts){
                                if(!err){
                                    dataOfServer[5]=LikedPosts[0];
                                    console.log("adding data "+"at : 5" + dataOfServer[5]);
                                    dataOfServer[6]=LikedPosts[1];
                                    console.log("adding data : "+"at : 6" + dataOfServer[6]);
                                    dataOfServer[7]=LikedPosts[2];
                                    console.log("adding data : "+"at : 7" + dataOfServer[7]);
                                
                                    // dataOfServer start from 8 to get 8 random posts
                                    posts.find(
                                            {},
                                            function(err, randomPost){
                                                for(var i=8;i<16;i++){
                                                    var random_post_number=getRandomInt(000,posts.length-1);
                                                    dataOfServer[i]=randomPost[random_post_number];
                                                    console.log("adding random data at "+ i + " :" + dataOfServer[i]);
                                                }


                                                 for(var i=0; i<dataOfServer.length;i++){
                                                        console.log("sending DataOfServer No " + i +" :" + dataOfServer[i]);
                                                    }
                                                    res.send(dataOfServer);


                                            }

                                        );  // 8 random posts



                                }
                            }

                        ); // most liked posts put to returning field
                

                

   

                }
            }
        );
    // last index of dataOfServer 4

   

    

    //dataOfServer ended at index 7




}


// randomize the random post selection
exports.randomize_post = function(req,res){
 
   var random_post_number=0;
   posts.count({},function(err,maxCount){
    console.log("max count is : " + maxCount );
    random_post_number=getRandomInt(000,maxCount-1);
        posts.findOne(
            {post_number:random_post_number},
            function(err,random_post_to_return){
                if(!err){
                   console.log("value is : " + random_post_to_return);
                   res.send(random_post_to_return); 
                }
            }
            )
    })




function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

}   // first page information fetch done


exports.post_selected = function(req, res){
console.log("in the routes, checking parameter :");
var recievedPostId= req.params.myId;
    posts.findOne({'_id':recievedPostId},function(err, myData){
        console.log("post to send");
        console.log(myData);
   
   

    });



    // res.redirect('showPost',
    //     {   'myid': recievedPostId,
    //         'page_element': "<br><br><br><div id='uploadForm'><form method='post' enctype='multipart/form-data' name='postUpload' action='/post_upload' ><br><br><input type='text' id='post_title' name='post_title' placeholder='Post Title'><br><br><input type='text' id='post_description' name='post_description' placeholder='Post Description'><br><br><input type='file' id='thumbnail' name='thumbnail' placeholder='Browse Image'><br><br><button>Post Image</button></form></div>"
    //     }
    //  ,function(){
    //     console.log('redirecting to showPost');
    // });

}

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

    //    post_number:count + 1, // *here1 and send it to server as post number
    //    img_name: *here2
        post_title:req.body.post_title,
        "post_img.data": fs.readFileSync(imgpth),
        "post_img.contentType" : 'image/png',
        "post_likes":req.body.fake_likes,
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

   
    


    res.redirect('adminXcorner',
        {   'myid': "asd",
            'page_element': "<br><br><br><div id='uploadForm'><form method='post' enctype='multipart/form-data' name='postUpload' action='/post_upload' ><br><br><input type='text' id='post_title' name='post_title' placeholder='Post Title'><br><br><input type='text' id='post_description' name='post_description' placeholder='Post Description'><br><br><input type='file' id='thumbnail' name='thumbnail' placeholder='Browse Image'><br><br><button>Post Image</button></form></div>"
        }
     ,function(){
        console.log('redirecting to admin');
    });
}




exports.Get_Five_Images=function(req,res)
{

    posts.find({}, function (err, doc) {
        
        //  getting five consecutive images 
        // var last_post=doc.length;

        // for(var j=last_post,var i=0;i<6;i++,j--){
        //     if(doc[last_post].img.data!=null){

        //     }
        // }

        //  Ends here

        // Ali getting one image
        if(doc[0].img.data == null)
        {
            res.send("yes");
        }
        else
        {
            var img;
            var result_img = {};
            var content = doc[0].img.contentType;
            for(var i=0;i<doc.length;i++)
            {
                img = new Buffer(doc[i].img.data, 'binary').toString('base64');
                result_img[i]=img;
            }
            res.contentType(content);
            console.log(result_img);
            res.send(result_img);
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



