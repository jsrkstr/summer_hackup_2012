var isAnimationOn = true;

$(document).ready(function() {		

	$prak = $('#prakrit');
	
	startSprite();

	startSpace();

	setupCarousal();

	$("#animation-trigger").click(toggleEnv);

	$('input[value=Submit]').click(saveForm);

});


function setupCarousal(){
	$("#carousal").carouFredSel({
		infinite : false,
		circular : false,
		auto : false,
		pagination : {
			container : ".carousal-control",
			anchorBuilder : function(nr, item) {
					return '<a class="carousal-control-link" href="#' + nr + '">' + item.attr("name") + '</a>';
			}
		},
		scroll : {
			onBefore : function(oldItem,newItem){
				if(oldItem.attr("name") == "Home"){
					stopSprite();
				} 
				else if(newItem.attr("name") == "Home" && isAnimationOn ){
					startSprite();
				}

			}
		}
	});
}


function stopSprite(){

	$prak
		.destroy()
		.stop()
		.animate({
			zoom : "80%",
			left : "-312px",
			top : "144px"
		}, "fast", function(){});

	//$('#carousal-control-2').css("z-index", "0");
}


function startSprite(){
	$prak
		.animate({
			zoom : "100%"
		})
		.sprite({fps: 30, no_of_frames: 1})
		.spRandom({top: 100, bottom: 200, left: 30, right: 200});

	//$('#carousal-control-2').css("z-index", "1");
}


function startSpace(){
	$('#space').pan({fps: 40, speed: 1, dir: 'right', depth: 50});
}


function stopSpace(){
	$('#space').destroy();	
}


function freezeAll(){
	isAnimationOn = false;
	stopSpace();
	stopSprite();
	$("#animation-trigger div")
		.toggleClass("playing")
		.toggleClass("stopped");
}


function heatAll(){
	isAnimationOn = true;
	startSpace();
	startSprite();
	$("#animation-trigger div")
		.toggleClass("playing")
		.toggleClass("stopped");
}

function toggleEnv(){
	if($("#animation-trigger div").hasClass("playing"))
		freezeAll();
	else
		heatAll();
}



function saveForm(){
	$.ajax({
		url: "http://api.openkeyval.org/formdata",
		dataType: "jsonp",
		success: function(data){

			var d = {
				name : $('input[value*=name]').val(),
				email : $('input[value*=e-mail]').val(),
				msg : $('textarea').val()
			};

			data[Date.now()] = d;
			

			$.ajax({
				url: "http://api.openkeyval.org/store/",
				data: {formdata : data},
				dataType: "jsonp",
				success: function(data){
					alert("Thanks For Your Feedback!");
				}
			});
		}

	});

	return false;
}