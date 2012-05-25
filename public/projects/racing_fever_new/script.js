var x = 0;
var y = 0;
var v=0;
var u=0;
var m= 0;
var t=0.05;
var a=0;
var d;
var object;	
var obj;
var keya=0,keyw=0,keys=0,keyd=0;
var q=0;
var keychar;
var tx= new Array(0,0,0,0,0,0,0,0,0,0);
var ty= new Array(0,0,0,0,0,0,0,0,0,0);
var tail=new Array();
var angle;
var postback=0;
var sumx;
var sumy;
var scx=0;
var scy=0;
var posimg;
var vmax= 1340;

function update() {
	
	
	
	if(u>0)
	{
		a=-100;
	
	}
	else if(u<0)
	{
		a=100;
	}
	
	
	
	if(keyw==1)
	{
		a=100;
		if(u<0)
		a=400;
	}
	else if(keys==1)
	{
		a=-100;
		if(u>0)
		a=-400;
	}
	
	if(keya==1 && u!=0)
	{
		if(u<0)
		q+=0.1;
		else 
		q-=0.1
	}
	else if(keyd==1 && u!=0)
	{
		if(u<0)
		q-=0.1;
		else
		q+=0.1;
	}
	


	
	
	
			
	
	
	
    
	
    d = u * t + (a * Math.pow(t, 2))/2;          
	v = u + a * t;
	//alert("a  " + a);
	var ang= q%6.28;
	//document.getElementById("detailsdiv").innerHTML= "u    " + u + " a    " + a  +"  d " +d + "  keyw  " + keyw +"  q "+ ang +"  keys   " + keychar + "  scx- "+scx;
	
	keychar="c";
	
    d= Math.round(d);
	//alert(d);
	if(v>vmax)
	u=vmax;
	else
	u = v;
	
	
	//x = d / (Math.sqrt(1 + Math.pow(m,2)));
	x= d*Math.cos(q);
	y= d*Math.sin(q);
	
	
	sumx= Math.round(x) + parseInt(object.left.split("p")[0]);
	sumy= Math.round(y) + parseInt(object.top.split("p")[0]);
	//alert("sumx   " +sumx);
	object.left = sumx + "px" ;
	object.top =  sumy + "px";
	scrollWindow(sumx,sumy);
	//footsteps();
	
	if(ang<0)angle=6.28+ang;
	else 
	angle=ang;

	//showtail();
	
	imageDirection(angle);
	
	speedometerupdate(v);
	

	postback=1;
}



function timing(evt)
{
	
	object = document.getElementById("cardiv").style;
	
	obj= document.getElementById("car");
	posimg =document.getElementById("posimg").style;
	document.getElementById("needle").style.top=160 + "px";
	document.getElementById("needle").style.left=0 + "px";	
	
	alert("GO GO GO");
	
	timeout=self.setInterval("update()",50);
	
	
}



function keydown(e)
{
var keynum;


if(window.event) // IE
{
keynum = e.keyCode
}
else if(e.which) // Netscape/Firefox/Opera
{
keynum = e.which
}

keychar = String.fromCharCode(keynum);

if(keychar=="W" || keychar=="&")
	keyw=1;
else if(keychar=="S" || keychar=="(")
	keys=1;
else if(keychar=="A" || keychar=="%")
	keya=1;
else if(keychar=="D" || keychar=="'")
	keyd=1;
	

}


function keyup(e)
{
var keynum;
var keychar;

if(window.event) // IE
{
keynum = e.keyCode
}
else if(e.which) // Netscape/Firefox/Opera
{
keynum = e.which
}

keychar = String.fromCharCode(keynum);

if(keychar=="W" || keychar=="&")
	keyw=0;
else if(keychar=="S" || keychar=="(")
	keys=0;
else if(keychar=="A" || keychar=="%")
	keya=0;
else if(keychar=="D" || keychar=="'")
	keyd=0;
}





function showtail()
{
//alert("tail");
	if(postback==0)
	{
			
		for(var j=0;j<=9;j++)
		{
		var na= "tail"+j;
		tail[j]= document.getElementById(na);
		}
	}

	
	for(var i=9;i>0;i--)
	{
		tx[i]=tx[i-1];
		ty[i]=ty[i-1];
	}
	tx[0]= parseInt(object.left.split("p")[0]);
	ty[0]= parseInt(object.top.split("p")[0]);

	for(var i=0;i<=9;i++)
	{
	tail[i].style.left=tx[i] + "px";
	tail[i].style.top=ty[i] + "px";
	}
document.getElementById("angle").innerHTML="tx0  "+ tx[0]+ "   ty0   "+ ty[0]+ "   style- " + tail[0].style.left+ tail[0].style.top + "  tail[0]  "+tail[1].src ;
}

function footsteps()
{

var xx= parseInt(object.left.split("p")[0]);
var yy= parseInt(object.top.split("p")[0]);
document.getElementById("img").innerHTML+="<img src=\"ball.gif\" style=\"left: "+ xx +"px;top: "+yy+"px; position: absolute; z-index:100\"/>";

}


function scrollWindow(a,b)
{
/*
var x0=5*Math.round(x);
	if(scx<x0)
	scx+=1;
	else if(scx>x0)
	scx-=1; 

var y0=5*Math.round(y);
	if(scy<y0)
	scy+=1;
	else if(scy>y0)
	scy-=1; 
*/

var mx=(sumx/3000)*200;
var my=(sumy/3000)*200;
posimg.top=my+5 + "px";
posimg.left=mx-100 + "px";

 $('#minimapdiv').animate({top:$(window).scrollTop()+screen.height-225+"px" },{queue: false, duration: 0});
 $('#minimapdiv').animate({left:$(window).scrollLeft()+25+"px" },{queue: false, duration: 0});	

 $('#speedometerdiv').animate({top:$(window).scrollTop()+screen.height-325+"px" },{queue: false, duration: 0});
 $('#speedometerdiv').animate({left:$(window).scrollLeft()+screen.width-225+"px" },{queue: false, duration: 0});	
  window.scrollTo(a-(screen.width/2)+scx,b-(screen.height/2)+scy);
  // window.scrollTo(a-(400)+scx,b-(300)+scy);
}



function imageDirection(radian)
{


var degree=(radian*180)/3.14;

$('#car').rotate(degree);
//document.getElementById("cardiv").style.left="50px";

//alert("imageDirection");
}


function speedometerupdate(speed)
{

$('#needle').rotate(Math.abs(speed)/5);
}

