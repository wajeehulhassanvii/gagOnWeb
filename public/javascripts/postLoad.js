
    $( document ).ready(function() {
    	var page_num = 1;
    	var post_num_min=0;
    	var post_num_max=9;
    	var max_post_per_page=10;
    	
    	$("#prev_page").on("click",function(){
    		
    		page_num++;
    		post_num_min=((page_num-1)*max_post_per_page);
    		post_num_max=((page_num*max_post_per_page)-1);
    		// append image creating dynamic id
    		
    	});
 		

 		$("#next_page").on("click",function(){
    		if(page_num>1){
    		page_num--;
    		post_num_min=((page_num-1)*max_post_per_page);
    		post_num_max=((page_num*max_post_per_page)-1);
    		//append image creating dynamic id
    		}

    	});

    });
 



