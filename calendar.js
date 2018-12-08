var showall=true;
var currentuser=localStorage.getItem("UserID");

//var tasks = ["Sweeping", "CPU", "Sign Cleaning", "Office", "Citations", "Reserved", "Sign Check", "Campus Check"];
var task_names = [];
var task_days = [];
var start_time = [];
var end_time = [];
var tempID = []

var emp_id = [];
var emp_n = [];
var numemps;

var schedules = [];
var employees = [];

$( document ).ready(function() {
    gencalendar(false);
	showcalendar();
});

function showcalendar(){
		//var h = document.getElementById('addempname');
		//$('#addempname')removeAttr('id').addClass('employeename') 
		$(".employee").toggle();
		$(".employeename").toggle();
		$(".employee#employee"+currentuser).show();

}
function togglePress(){
	$(".task").each(function(){
		if($(this).hasClass('employeePressed')){
			$(this).removeClass('employeePressed');
		}else{
			$(this).addClass('employeePressed');
		}
	});	
}
function gencalendar(all){
	$(".day").empty();
	
	jQuery.get( `http://${globalIP}:4000/api/getAllEmployees?token=${localStorage.getItem("token")}`, function( data ) {
		numemps = data.length;
		for(var i = 0; i< data.length;i++){
			emp_n[i] = data[i]["first_name"] +" "+data[i]["last_name"]; 
		}
		
		employees=data;
		
	jQuery.get(`http://${globalIP}:4000/api/getAllSchedule`,function(sch){
		
		schedules = sch;
		
		for(var j=0;j<numemps;j++){
			var emp = "<div class='employee' id='employee"+j+"'><div class='employeename'>"+emp_n[j]+"</div>";
			for(var i=0+12;i<24+12;i++){
				var ass = false;
				var assn = "";
				for(var k=0;k<schedules.length;k++){
					//console.log(schedules[k]["employeeID"],employees[j]["employeeID"]);
					if(schedules[k]["employeeID"]==employees[j]["employeeID"]){
						//console.log(	(Math.floor(i/2))+":"+(i%2*30)<schedules[k]["start_time"]	);
						if((Math.floor(i/2))+":"+(i%2*30)<schedules[k]["end_time"]){
							if((Math.floor(i/2))+":"+(i%2*30)>schedules[k]["start_time"]){
								console.log((Math.floor(i/2))+":"+(i%2*30)==schedules[k]["start_time"]);
								ass=true;
								assn=schedules[k]["task_name"];
							}
						}
					}
				}
				//console.log(ass)
				if(ass){
					var classes ="task assigned";
					if(showall){
						classes+=" employeePressed";
					}
					emp+="<div class='"+classes+"'>"+assn+"</div>";
				}else{
					var classes ="task";
					if(showall){
						classes+=" employeePressed";
					}
					emp+="<div class='"+classes+"'>"+assn+"</div>";
				}
				
			}
		emp+="</div>";
		$(".day").append(emp);

	}
		
	});
		
    $(".task").each(function(){
  //       if(Math.random()<0.2){
		// 	$(this)[0].innerHTML="<p>"+tasks[Math.floor(Math.random()*tasks.length)]+"</p>";
		// 	$(this).addClass("assigned");
		// }
			
    });
	
	});
}


	$('body').on('click','.dayheader',function(){
		$(".dayheader ,.day").toggle();
		$(this).show();
		$(this).next(".day").show();
	});

	// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

// Get the navbar
var timebar = document.getElementById('timebar');

// Get the offset position of the navbar
var sticky = timebar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    timebar.classList.add("sticky")
  } else {
    timebar.classList.remove("sticky");
  }
}

