$(document).ready(function(){

	//Nivo slider
	$('#slider').nivoSlider({
	        effect:'random', // Specify sets like: 'fold,fade,sliceDown' or choose 'random' for mixed effects
	        slices:15, // For slice animations
	        boxCols: 8, // For box animations
	        boxRows: 4, // For box animations
	        animSpeed:500, // Slide transition speed
	        pauseTime:5000, // How long each slide will show
			pauseOnHover:true,
	       directionNav:true, // Next & Prev navigation
	        directionNavHide:true, // Only show on hover
	        controlNav:false // 1,2,3... navigation
		
	});


	// Fb integration

	$.ajax({
		url : "https://graph.facebook.com/305679052854513/attending?access_token=AAAExjJ4GM1IBAOI0MesEBTHkHHZA24F1fdlf5g9BZC08M7kKCr8qdZBd74OIjwbZBp6w0TAsG1CFRkStBTOVGQXPnrrjlxpZC2EecHJQzqQZDZD",
		dataType : "jsonp",
		success: function(d){
			for (var i = d.data.length - 1; i >= 0; i--) {
				$("<img>", {
					src : "http://graph.facebook.com/" + d.data[i].id + "/picture",
					"class" : "attending-picture"
				}).appendTo($("#attending"));
			};
		},
		error : function(){
			console.log("error");
		}
	});

});