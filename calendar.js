var showall=false;
var currentuser=0;

var tasks = ["Sweeping", "CPU", "Sign Cleaning", "Office", "Citations", "Reserved", "Sign Check", "Campus Check"];


gencalendar(false);
showcalendar();

function showcalendar(){
	$(".employee").toggle();
	$(".employeename").toggle();
	$(".employee#employee"+currentuser).show();
}

function gencalendar(all){
	$(".day").empty();
		for(var j=0;j<2;j++){
			var emp = "<div class='employee' id='employee"+j+"'><div class='employeename'>Employee"+j+"</div>";
			for(var i=0;i<24;i++){
				emp+="<div class='task'></div>";
			}
			emp+="</div>";
			$(".day").append(emp);
		}
		
    $(".task").each(function(){
        if(Math.random()<0.2){
			$(this)[0].innerHTML="<p>"+tasks[Math.floor(Math.random()*tasks.length)]+"</p>";
			$(this).addClass("assigned");
		}
    });
		
}


	$('body').on('click','.dayheader',function(){
		$(".dayheader ,.day").toggle();
		$(this).show();
		$(this).next(".day").show();
	});