
    $( document ).ready(function() {
    	var page_num = 1;  //current page number
    	var post_num_min=0;    //post number minimum
    	var post_num_max=9;    //post number maximum
    	var max_post_per_page=10;  //max post per page
    	

    	$("#prev_page").on("click",function(){
        // previous page button    		
    		page_num++;
    		post_num_min=((page_num-1)*max_post_per_page);
    		post_num_max=((page_num*max_post_per_page)-1);
    		// append image creating dynamic id
            var dynamic_id="img-";

            for(var i=post_num_min;i<=post_num_max;i++){
                if(post_num_min<10&&post_num_min>-1){
                    dynamic_id=dynamic_id+"00"+i;
                    // do what you want
                    dynamic_id="img-";
                }

                if(post_num_min<100&&post_num_min>9){
                    dynamic_id=dynamic_id+"0"+i;
                    // do what you want
                    dynamic_id="img-";
                }

                if(post_num_min<1000&&post_num_min>100){
                    dynamic_id=dynamic_id+i;
                    // do what you want
                    dynamic_id="img-";
                }


            }
    		
    	});
 		

 		$("#next_page").on("click",function(){
    		if(page_num>1){
    		page_num--;
    		post_num_min=((page_num-1)*max_post_per_page);
    		post_num_max=((page_num*max_post_per_page)-1);
    		//append image creating dynamic id
            var dynamic_id="img-";

            for(var i=post_num_min;i<=post_num_max;i++){
                if(post_num_min<10&&post_num_min>-1){
                    dynamic_id=dynamic_id+"00"+i;
                    // do what you want
                    dynamic_id="img-";
                }

                if(post_num_min<100&&post_num_min>9){
                    dynamic_id=dynamic_id+"0"+i;
                    // do what you want
                    dynamic_id="img-";
                }

                if(post_num_min<1000&&post_num_min>100){
                    dynamic_id=dynamic_id+i;
                    // do what you want
                    dynamic_id="img-";
                }


    		}

    	});

    });
 



// var dynamic_id="img-";
//             for(var i=0;i<=9;i++){
//                   dynamic_id=dynamic_id+"00"+i;
                
// document.write(dynamic_id);
// dynamic_id="img-";

//             }
