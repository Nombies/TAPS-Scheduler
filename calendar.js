var showall=false;
var currentuser=localStorage.getItem("UserID");

//var tasks = ["Sweeping", "CPU", "Sign Cleaning", "Office", "Citations", "Reserved", "Sign Check", "Campus Check"];
var task_names = [];
var task_days = [];
var start_time = [];
var end_time = [];
var tempID = []
jquery.get(`http://${globalIP}:4000/api/getAllSchedule`,function(data){
	for(var i =0;i<data.length;i++){
		task_names[i] = data[i]['task_name'];
		task_days[i] = data[i]['task_days'];
		start_time[i] = data[i]['start_time'];
		end_timep[i] = data[i]['end_time'];
		tempID[i] = data[i]['employeeID'];
	}
});
var emp_id = [];
var emp_n = [];
var numemps;
jQuery.get( `http://${globalIP}:4000/api/getAllEmployees?token=${localStorage.getItem("token")}`, function( data ) {
	numemps = 
	for(var i = 0; i< data.length;i++){
		emp_id[i] = data[i]["employeeID"];
		emp_n[i] = data[i]["first_name"] +" "+data[i]["last_name"]; 
	}
});
gencalendar(false);
showcalendar();

function showcalendar(){
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
		for(var j=0;j<numemps;j++){
			var emp = "<div class='employee' id='employee"+j+"'><div class='employeename'>Employee"+j+"</div>";
			for(var i=0;i<24;i++){
				emp+=`<div class='task' '${i}'></div>`;
			}
			emp+="</div>";
			$(".day").append(emp);
		}
		
    $(".task").each(function(){
  //       if(Math.random()<0.2){
		// 	$(this)[0].innerHTML="<p>"+tasks[Math.floor(Math.random()*tasks.length)]+"</p>";
		// 	$(this).addClass("assigned");
		// }
			
    });
		
}


	$('body').on('click','.dayheader',function(){
		$(".dayheader ,.day").toggle();
		$(this).show();
		$(this).next(".day").show();
	});