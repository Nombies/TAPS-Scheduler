function logoutFunction(){
	window.location.href = "login.html";
	localStorage.removeItem('token');
	localStorage.removeItem('userID');
}
function focuscalendar(){
	$('.slidecover').hide('slide', {direction: 'left'}, 1);
	HideCenters();
}
function HideCenters(){
	$('.centermenu#Tasks').hide('fade', {direction: 'right'}, 100);
	$('.centermenu#Employees').hide('fade', {direction: 'right'}, 100);
	$('.centermenu#TOR').hide('fade', {direction: 'right'}, 100);
	$('.centermenu#ShiftX').hide('fade', {direction: 'right'}, 100);
	$('.centermenu#Settings').hide('fade', {direction: 'right'}, 100);
	$('.centermenu#Cando').hide('fade', {direction: 'right'}, 100);
	$('.centermenu#NA').hide('fade', {direction: 'right'},100);
}

var globalIP = "13.57.29.25";
localStorage.setItem('IP',globalIP); 
$(document).ready(function() {
	console.log(localStorage.getItem("token"));
	var userEmp = 0;
	var userTask = 0;
	jQuery.get( `http://${globalIP}:4000/api/getEmployeeAttributesByEmployeeID?employeeID=${localStorage.getItem('userID')}&token=${localStorage.getItem('token')}`, 
        function( data ) {
			userTask= data[0]["modify_task"];
			userEmp = data[0]["modify_emp_attr"];
			if(userTask==0){
				$("body").append("<style>body > div.slidecover > div:nth-child(1){display:none;}</style>");
			}
			if(userEmp == 0){
				$("body").append("<style>#Employees > div.addnew{display:none;}</style>");
				$("body").append("<style>#Employees > form > div > div > div.menuitem.submit{display:none;}</style>");
			}
    });

	$('.floatdiv').click(function(){
		$('.slidecover').toggle('slide', {direction: 'left'}, 400);
		HideCenters();
	});
	function fillTask(){
		if($(".centermenu#Tasks").children().length==0){
			jQuery.get( `http:${globalIP}:4000/api/getAllTasks`, function( data ) {
								
                for(var i=0;i<data.length;i++){
                    var taskitem = document.createElement("div");
                    taskitem.classList.add("menuitem");
                    taskitem.classList.add("exists");
                    taskitem.innerHTML="<p>"+data[i]["name"]+"</p>"
                    jQuery.data( taskitem, "taskdata", data[i] );
                    $(".centermenu#Tasks")[0].append(taskitem);
                }
				    var taskitem = document.createElement("div");
                    taskitem.classList.add("menuitem");
                    taskitem.classList.add("addnew");
                    taskitem.innerHTML="<p>"+"+"+"</p>"
                    jQuery.data( taskitem, "taskdata", {"name":"NEW"});
                    $(".centermenu#Tasks")[0].append(taskitem);
            });
		}		
	}
	$('body > div.slidecover > div:nth-child(1)').click(function(){	//click task list
		$('.centermenu#Tasks').show('fade', {direction: 'right'}, 400);
		$('.slidecover').hide('slide', {direction: 'left'}, 100);
		fillTask();
	});
	function fillEmp(){
		if($(".centermenu#Employees").children().length==0){
           	
            jQuery.get( `http://${globalIP}:4000/api/getAllEmployees?token=${localStorage.getItem("token")}`, function( data ) {
								
                for(var i=0;i<data.length;i++){
                    var empitem = document.createElement("div");
                    empitem.classList.add("menuitem");
                    empitem.classList.add("exists");
                    empitem.innerHTML="<p>"+data[i]["first_name"]+"</p>"
                    jQuery.data( empitem, "empdata", data[i] );
                    $(".centermenu#Employees")[0].append(empitem);
                }
				    var empitem = document.createElement("div");
                    empitem.classList.add("menuitem");
                    empitem.classList.add("addnew");
                    empitem.innerHTML="<p>"+"+"+"</p>"
                    jQuery.data( empitem, "empdata", {"first_name":"NEW"});
                    $(".centermenu#Employees")[0].append(empitem);
            });
           
		}
	}
	$('body > div.slidecover > div:nth-child(2)').click(function(){//click employee list
		$('.centermenu#Employees').show('fade', {direction: 'right'}, 400);
		$('.slidecover').hide('slide', {direction: 'left'}, 100);
		fillEmp();
	});
	function fillTOR(){
		if($(".centermenu#TOR").children().length==0){
			var toritem = document.createElement("div");
	        toritem.classList.add("menuitem");
	        toritem.classList.add("addnew");
	        toritem.classList.add("new");
	        toritem.classList.add("small");
	        toritem.innerHTML="<p>"+"New"+"</p>"
	        $(".centermenu#TOR")[0].append(toritem);

	            jQuery.post( `http://${globalIP}:4000/api/getTORByID`,
	            {
				"employeeID":""+localStorage.getItem("userID")
	        	},
	        	 function( data , status, x ) {
	        	 	//console.log(data,status,x);
	        	 	//console.log(localStorage.getItem("userID"))
	        	 	$(".centermenu#TOR").eq(0).append("<div class ='headContainer'>Pending Requests</div>");				
	                for(var i=0;i<data.length;i++){
	                    var toritem = document.createElement("div");
	                	if(data[i]["request_status"] == "i"){
		                    toritem.classList.add("menuitem");
		                    toritem.classList.add("exists");
		                    toritem.innerHTML="<p>"+data[i]["subject"]+"</p>"
		                    jQuery.data( toritem, "tordata", data[i] );
		                    $(".centermenu#TOR")[0].append(toritem);
		                }
	                }
	                $(".centermenu#TOR").eq(0).append("<div class ='headContainer'>Accepted Requests</div>");
	                for(var i=0;i<data.length;i++){
	                    var toritem = document.createElement("div");
	                	if(data[i]["request_status"] == "a"){
		                    toritem.classList.add("menuitem");
		                    toritem.classList.add("exists");
		                    toritem.innerHTML="<p>"+data[i]["subject"]+"</p>"
		                    jQuery.data( toritem, "tordata", data[i] );
		                    $(".centermenu#TOR")[0].append(toritem);
		                }
	                }
					$(".centermenu#TOR").eq(0).append("<div class ='headContainer'>Rejected Requests</div>");
					for(var i=0;i<data.length;i++){
	                    var toritem = document.createElement("div");
	                	if(data[i]["request_status"] == "r"){
		                    toritem.classList.add("menuitem");
		                    toritem.classList.add("exists");
		                    toritem.innerHTML="<p>"+data[i]["subject"]+"</p>"
		                    jQuery.data( toritem, "tordata", data[i] );
		                    $(".centermenu#TOR")[0].append(toritem);
		                }
	                }
	            });
		}
	}
	$('body > div.slidecover > div:nth-child(3)').click(function(){//click TOR
		$('.centermenu#TOR').empty();
		$('.centermenu#TOR').show('fade', {direction: 'right'}, 400);
		$('.slidecover').hide('slide', {direction: 'left'}, 100);
		fillTOR();

	});
	function fillShiftX(){
		if($(".centermenu#ShiftX").children().length==0){
			$(".centermenu#ShiftX").eq(0).append("<div class ='headContainer'>Posted By Others</div>");
			for(var i=2;i<5;i++){
				var shifts = document.createElement("div");
				shifts.classList.add("menuitem");
				shifts.classList.add("otherShiftX")
				shifts.innerHTML="<p>Shift "+i+"</p>"
				$(".centermenu#ShiftX")[0].append(shifts);
			}
			$(".centermenu#ShiftX").eq(0).append("<div class ='headContainer'>Posted By You</div>");
			for(var i=0;i<2;i++){
				var shifts = document.createElement("div");
				shifts.classList.add("menuitem");
				shifts.classList.add("yourShiftX");
				shifts.innerHTML="<p>Shift "+i+"</p>"
				$(".centermenu#ShiftX")[0].append(shifts);
			}
			// $(".centermenu#ShiftX").eq(0).append(
			// 	'<p></p>' +
			// 	'<div style= "margin:0 5%">' +
			// 		'<div class="menuitem cancel">' +
			// 			'<p>Cancel</p>' +
			// 		'</div>' +
			// 		'<div class="menuitem submit">'+
			// 			'<p>Submit</p>'+
			// 		'</div>'+
			// 	'</div>');
		}

	}
	$('body > div.slidecover > div:nth-child(4)').click(function(){//click shift exchange
		$('.centermenu#ShiftX').show('fade', {direction: 'right'}, 400);
		$('.slidecover').hide('slide', {direction: 'left'}, 100);
		fillShiftX();
	});

	$('body > div.slidecover > div:nth-child(5)').click(function(){//click settings
		
	});
	$('#Candobutton').click(function(){
		$('.centermenu#Employees').hide('fade', {direction: 'right'}, 100);
		$('.centermenu#Cando').show('fade', {direction: 'right'}, 400);
		if($(".centermenu#Cando").children().length==0){
					
			//getAllTasks
			
			jQuery.get( `http://${globalIP}:4000/api/getAllTasks`, function( data ) {
				
				$(".centermenu#Cando").eq(0).append(
				"<div class ='headContainer'>This employee will be assigned green tasks, click 'All' to select all tasks, click 'None' to deselect all tasks.</div>" +				
					"<div>" +
						"<div class ='Legend' id ='AllCan'>All</div><div class ='Legend' id ='AllCant'>None</div>" +
					"</div>");
				
                for(var i=0;i<data.length;i++){
					var canitem = document.createElement("div");
					canitem.classList.add("Cantdotask");
					canitem.classList.add("menuitem");
					canitem.innerHTML="<p>"+data[i]["name"]+"</p>"
					jQuery.data( canitem, "taskdata", data[i] );
					$(".centermenu#Cando")[0].append(canitem);
					//debugger;
                }
				
				$(".centermenu#Cando").eq(0).append(
				'<div style= "margin:0 5%">' +
					'<div class="menuitem cancel">' +
						'<p>Cancel</p>' +
					'</div>' +
					'<div class="menuitem submit">' +
						'<p>Submit</p>' +
					'</div>' +
				'</div>'); 
				
				jQuery.post( `http://${globalIP}:4000/api/getCanDoByEmployeeID`,{"employeeID":""+empID} , function( data ) {		
					var tasks = $(".menuitem.Cantdotask")
					
					for(var i=0;i<tasks.length;i++){
						var dat = jQuery.data( tasks[i], "taskdata");
						for(var j=0;j<data.length;j++){
							//debugger;
							if(data[j]["taskID"]==dat["taskID"]){
								tasks[i].classList.add("Candotask");
							}
						}
					}		
				});
            });
		}
	});

	$('body').on('click', '.centermenu#Cando > .menuitem', function(){
		$(this).toggleClass("Candotask",200);
	});

	function fillNA(){
		var sun = 0;
		var mon = 1;
		var tue = 2;
		var wed = 3;
		var thu = 4;
		var fri = 5;
		var sat = 6;
		if($(".centermenu#NA").children().length==0){
			console.log(empID);
			jQuery.post(`http://${globalIP}:4000/api/getNotAvailableByEmployeeID`,
			{
				"employeeID":""+empID
			},
			function(data,status,x){
				console.log(data,status,x);
			    var naitem = document.createElement("div");
			    var back = document.createElement("div");

            	back.classList.add("menuitem");
            	back.classList.add("back");
            	back.classList.add("small");
            	back.innerHTML="<p>Back</p>"
        		$(".centermenu#NA")[0].append(back);

            	
				$(".centermenu#NA").eq(0).append("<div class ='headContainer'>Sunday</div>");
				for(var i=0;i<data.length;i++){
                	var naitem = document.createElement("div");
            		if(data[i]["day"] == sun){
                    	naitem.classList.add("menuitem");
                    	naitem.classList.add("exists");
                    	naitem.innerHTML="<p>"+data[i]["start_time"]+"-"+data[i]["end_time"]+"</p>";
                    	jQuery.data( naitem, "nadata", data[i] );
                    	$(".centermenu#NA")[0].append(naitem);
                	}
            	}
				$(".centermenu#NA").eq(0).append("<div class ='headContainer'>Monday</div>");
				for(var i=0;i<data.length;i++){
                	var naitem = document.createElement("div");
            		if(data[i]["day"] == mon){
                    	naitem.classList.add("menuitem");
                    	naitem.classList.add("exists");
                    	naitem.innerHTML="<p>"+data[i]["start_time"]+"-"+data[i]["end_time"]+"</p>";
                    	jQuery.data( naitem, "nadata", data[i] );
                    	$(".centermenu#NA")[0].append(naitem);
                	}
            	}
            	$(".centermenu#NA").eq(0).append("<div class ='headContainer'>Tuesday</div>");
				for(var i=0;i<data.length;i++){
                	var naitem = document.createElement("div");
            		if(data[i]["day"] == tue){
                    	naitem.classList.add("menuitem");
                    	naitem.classList.add("exists");
                    	naitem.innerHTML="<p>"+data[i]["start_time"]+"-"+data[i]["end_time"]+"</p>";
                    	jQuery.data( naitem, "nadata", data[i] );
                    	$(".centermenu#NA")[0].append(naitem);
                	}
            	}
            	$(".centermenu#NA").eq(0).append("<div class ='headContainer'>Wednesday</div>");
				for(var i=0;i<data.length;i++){
                	var naitem = document.createElement("div");
            		if(data[i]["day"] == wed){
                    	naitem.classList.add("menuitem");
                    	naitem.classList.add("exists");
                    	naitem.innerHTML="<p>"+data[i]["start_time"]+"-"+data[i]["end_time"]+"</p>";
                    	jQuery.data( naitem, "nadata", data[i] );
                    	$(".centermenu#NA")[0].append(naitem);
                	}
            	}
            	$(".centermenu#NA").eq(0).append("<div class ='headContainer'>Thursday</div>");
				for(var i=0;i<data.length;i++){
                	var naitem = document.createElement("div");
            		if(data[i]["day"] == thu){
                    	naitem.classList.add("menuitem");
                    	naitem.classList.add("exists");
                    	naitem.innerHTML="<p>"+data[i]["start_time"]+"-"+data[i]["end_time"]+"</p>";
                    	jQuery.data( naitem, "nadata", data[i] );
                    	$(".centermenu#NA")[0].append(naitem);
                	}
            	}
            	$(".centermenu#NA").eq(0).append("<div class ='headContainer'>Friday</div>");
				for(var i=0;i<data.length;i++){
                	var naitem = document.createElement("div");
            		if(data[i]["day"] == fri){
                    	naitem.classList.add("menuitem");
                    	naitem.classList.add("exists");
                    	naitem.innerHTML="<p>"+data[i]["start_time"]+"-"+data[i]["end_time"]+"</p>";
                    	jQuery.data( naitem, "nadata", data[i] );
                    	$(".centermenu#NA")[0].append(naitem);
                	}
            	}
            	$(".centermenu#NA").eq(0).append("<div class ='headContainer'>Saturday</div>");
				for(var i=0;i<data.length;i++){
                	var naitem = document.createElement("div");
            		if(data[i]["day"] == sat){
                    	naitem.classList.add("menuitem");
                    	naitem.classList.add("exists");
                    	naitem.innerHTML="<p>"+data[i]["start_time"]+"-"+data[i]["end_time"]+"</p>";
                    	jQuery.data( naitem, "nadata", data[i] );
                    	$(".centermenu#NA")[0].append(naitem);
                	}
            	}
            	naitem.classList.add("menuitem");
            	naitem.classList.add("addnew");
            	naitem.classList.add("new");
            	naitem.classList.add("small");
            	naitem.innerHTML="<p>New time</p>";    
            	$(".centermenu#NA")[0].append(naitem);            	        	
			});
		}		
	}
	$('#Availability').click(function(){
		$('.centermenu#Employees').hide('fade',{direction:'right'},100);
		$('.centermenu#NA').show('fade',{direction:'right'},400);
		fillNA();
	});

	var taskAdd = false;
	var taskID = 0;

	$('body').on('click', '.centermenu#Tasks > .exists', function(){
		taskAdd = false;
        var id = jQuery.data($(this)[0],"taskdata")["taskID"];
        var name = jQuery.data($(this)[0],"taskdata")["name"];
        var inst = jQuery.data($(this)[0],"taskdata")["instructions"];
        var earlS = jQuery.data($(this)[0],"taskdata")["earliest_start"];
        var lateE = jQuery.data($(this)[0],"taskdata")["latest_end"];
        var dur = jQuery.data($(this)[0],"taskdata")["duration"];
        var reps = jQuery.data($(this)[0],"taskdata")["reqs_in_week"];
        var sun = jQuery.data($(this)[0],"taskdata")["sunday"];
        var mon = jQuery.data($(this)[0],"taskdata")["monday"];
        var tues = jQuery.data($(this)[0],"taskdata")["tuesday"];
        var wed = jQuery.data($(this)[0],"taskdata")["wednesday"];
        var thurs = jQuery.data($(this)[0],"taskdata")["thursday"];
        var fri = jQuery.data($(this)[0],"taskdata")["friday"];
        var sat = jQuery.data($(this)[0],"taskdata")["saturday"];
        var empN =  jQuery.data($(this)[0],"taskdata")["employees_needed"];
        var del = jQuery.data($(this)[0],"taskdata")["delete_after"];
        if(del){
        	$("input[name ='persist']")[0].checked = "";
        	$("input[name ='deleteAfter']").prop("disabled",false);
        }else{
        	$("input[name ='persist']")[0].checked = "checked";
        	$("input[name ='deleteAfter']").prop("disabled",true);
        }
        var pri = jQuery.data($(this)[0],"taskdata")["priority"];
        $(this).parent().empty();
        
        var clone = $("#taskform").clone(true);
		clone.attr("id","");
		clone.show();
        //debugger;
        
        
		$(clone).find("input[name ='name']").eq(0)[0].value=name;
        $(clone).find("textarea[name ='instructions']").eq(0)[0].value=inst;
        $(clone).find("input[name ='earliestStart']").eq(0)[0].value=earlS;
        $(clone).find("input[name ='latestEnd']").eq(0)[0].value=lateE;
        $(clone).find("input[name ='duration']").eq(0)[0].value=dur;
        $(clone).find("input[name ='repeat']").eq(0)[0].value=reps;
        $(clone).find("input[name ='numEmps']").eq(0)[0].value=empN;
        $(clone).find("input[name ='deleteAfter']").eq(0)[0].value = del;
        $(clone).find("select[name ='priority']").eq(0)[0].value = pri;
        if(sun){
           $(clone).find("input[name ='sun']").eq(0)[0].checked="checked";
        }
        if(mon){
           $(clone).find("input[name ='mon']").eq(0)[0].checked="checked";
        }
        if(tues){
           $(clone).find("input[name ='tues']").eq(0)[0].checked="checked";
        }
        if(wed){
           $(clone).find("input[name ='wed']").eq(0)[0].checked="checked";
        }
        if(thurs){
           $(clone).find("input[name ='thurs']").eq(0)[0].checked="checked";
        }        
        if(fri){
           $(clone).find("input[name ='fri']").eq(0)[0].checked="checked";
        }
        if(sat){
           $(clone).find("input[name ='sat']").eq(0)[0].checked="checked";
        }
        
		$(".centermenu#Tasks").append(clone)
		taskID = id;
		console.log('taskid is ' + id);
	});

	$('body').on('click', '.centermenu#Tasks > .addnew', function(){
		taskAdd = true;
        var name = jQuery.data($(this)[0],"taskdata")["name"];
        $(this).parent().empty();
        
        var clone = $("#taskform").clone(true);
		clone.attr("id","");
		clone.show();
        //debugger;
        
        
		$(clone).find("input[name='name']").eq(0)[0].value=name;
		$(".centermenu#Tasks").append(clone)
		
	});

	var empAdd = false;
	var empID = 0;
	$('body').on('click', '.centermenu#Employees > .exists', function(){
		empAdd = false;

        //console.log($(this)[0]);
        console.log(jQuery.data($(this)[0],"empdata"));
        var id = jQuery.data($(this)[0],"empdata")["employeeID"];
        var first = jQuery.data($(this)[0],"empdata")["first_name"];
        var middle = jQuery.data($(this)[0],"empdata")["middle_name"];
        var last = jQuery.data($(this)[0],"empdata")["last_name"];
        var email = jQuery.data($(this)[0],"empdata")["email"];
        //var password = jQuery.data($(this)[0],"empdata")["password_hash"];
        var phone = jQuery.data($(this)[0],"empdata")["phone_number"];
        var attr = jQuery.data($(this)[0],"empdata")["modify_emp_attr"];
        var task = jQuery.data($(this)[0],"empdata")["modify_task"];
        var pref = jQuery.data($(this)[0],"empdata")["preffered_hours"];
        $(this).parent().empty();
        
        var clone = $("#employeeform").clone(true);
		clone.attr("id","");
		clone.show();
        //debugger;
        
        
		$(clone).find("input[name='first']").eq(0)[0].value=first;
        $(clone).find("input[name='middle']").eq(0)[0].value=middle;
        $(clone).find("input[name='last']").eq(0)[0].value=last;
        $(clone).find("input[name='email']").eq(0)[0].value=email;
        $(clone).find("input[name='phone_number']").eq(0)[0].value=phone;
        $(clone).find("select[name='hours']").eq(0)[0].value = pref;
        if(task){
           $(clone).find("input[name='modify_task']").eq(0)[0].checked="checked";
        }
        
        if(attr){
            $(clone).find("input[name='modify_emp_attr']").eq(0)[0].checked="checked";
        }

        
		$(".centermenu#Employees").append(clone)
		empID = id;
		console.log(empID);
	});

	
	$('body').on('click', '.centermenu#Employees > .addnew', function(){
		empAdd = true;
        var first = jQuery.data($(this)[0],"empdata")["first_name"];
        $(this).parent().empty();
        
        var clone = $("#employeeform").clone(true);
		clone.attr("id","");
		clone.show();
        //debugger;
        
        
		$(clone).find("input[name='first']").eq(0)[0].value=first;
		$(".centermenu#Employees").append(clone)
		
	});
	var torAdd = false;
	var torID = 0;
	$('body').on('click', '.centermenu#TOR > .exists', function(){
		torAdd = false;
        var id = jQuery.data($(this)[0],"tordata")["employeeID"];
        var subject = jQuery.data($(this)[0],"tordata")["subject"];
        var reason = jQuery.data($(this)[0],"tordata")["reason"];
        var startT = jQuery.data($(this)[0],"tordata")["start_time"];
        var endT = jQuery.data($(this)[0],"tordata")["end_time"];
        var startD = jQuery.data($(this)[0],"tordata")["start_date"];
        var endD = jQuery.data($(this)[0],"tordata")["end_date"];
        var status = jQuery.data($(this)[0],"tordata")["request_status"];
        var comment = jQuery.data($(this)[0],"tordata")["supervisor_comment"];
        $(this).parent().empty();
        
        var clone = $("#torform").clone(true);
		clone.attr("id","");
		clone.show();
        //debugger;
        
        
		$(clone).find("input[name='Subject']").eq(0)[0].value=subject;
        $(clone).find("textarea[name='Reason']").eq(0)[0].value=reason;
        $(clone).find("input[name='StartT']").eq(0)[0].value=startT;
        $(clone).find("input[name='EndT']").eq(0)[0].value=endT;
        $(clone).find("input[name='StartD']").eq(0)[0].value=startD;
        $(clone).find("input[name='EndD']").eq(0)[0].value=endD;

        
		$(".centermenu#TOR").append(clone)
		torID = id;
	});

	$('body').on('click', '.centermenu#TOR > .addnew', function(){
		torAdd = true;
        $(this).parent().empty();
        
        var clone = $("#torform").clone(true);
		clone.attr("id","");
		clone.show();
		$(".centermenu#TOR").append(clone)
		
	});

	var naAdd = false;
	var oed;
	var ost;
	var osd;
	var oet;
	$('body').on('click', '.centermenu#NA > .exists', function(){
		naAdd = false;
        var id = jQuery.data($(this)[0],"nadata")["employeeID"];
        var startT = jQuery.data($(this)[0],"nadata")["start_time"];
        var endT = jQuery.data($(this)[0],"nadata")["end_time"];
        var startD = jQuery.data($(this)[0],"nadata")["start_date"];
        var endD = jQuery.data($(this)[0],"nadata")["end_date"];
        var day = jQuery.data($(this)[0],"nadata")["day"];

        $(this).parent().empty();
        
        var clone = $("#naform").clone(true);
		clone.attr("id","");
		clone.show();
        //debugger;
        $(clone).find("select[name = 'day']").eq(0)[0].value=day;
        $(clone).find("input[name='StartT']").eq(0)[0].value=startT;
        $(clone).find("input[name='EndT']").eq(0)[0].value=endT;
        $(clone).find("input[name='StartD']").eq(0)[0].value=startD;
        $(clone).find("input[name='EndD']").eq(0)[0].value=endD;

        
		$(".centermenu#NA").append(clone)
		empID = id;
		oed = endD;
		ost = startT;
		osd = startD;
		oet = endT;
	});	
	$('body').on('click','.centermenu#NA > .addnew', function(){
		naAdd = true;
		$(this).parent().empty();

		var clone = $("#naform").clone(true);
		clone.attr("id","");
		clone.show();
		$(".centermenu#NA").append(clone);
		
	});

	// $('body').on('click', '.centermenu#Tasks > .exists', function(){
	// 	//debugger;
	// 	var data = $(this).find("p")[0].innerHTML;
	// 	$(this).parent().empty();

	// 	var clone = $("#taskform").clone();
	// 	clone.attr("id","");
	// 	clone.show();
		
	// 	$(clone).find("input[name='name']").eq(0)[0].value=data;
	// 	$(".centermenu#Tasks").append(clone)
	// });
    

	//	$('body').on('click', '.menuitem.cancel', function(){
	//		$(this).closest(".centermenu").empty();
	//		HideCenters();
	//	});
	//    
	//	$('body').on('click', '.menuitem.submit', function(){
	//		$(this).closest(".centermenu").empty();
	//		HideCenters();
	//	});
    

    

    $('body').on('click', '#Tasks > form > div > div.menuitem.submit', function(){
		//debugger;
        newTask(function(){
            $('.submit').closest(".centermenu").empty() //temporary
            HideCenters();
        }, taskAdd,taskID);
        taskAdd = false;
    });



	$('body').on('click', '#Employees > form > div > div > div.menuitem.submit', function(){
		//debugger;
        newEmployee(function(){
            $('.submit').closest(".centermenu").empty() //temporary
            HideCenters();
        }, empAdd,empID);
        empAdd = false;
    });
    
	$('body').on('click', '#Cando > div > div.menuitem.submit', function(){
		//debugger;
		var tasks = $(".menuitem.Cantdotask");
		//debugger;
		for(var i=0;i<tasks.length;i++){
			if(tasks[i].classList.contains("Candotask")){
				jQuery.post( `http://${globalIP}:4000/api/addCanDo`,{"employeeID":""+empID+"","taskID":$.data(tasks[i],"taskdata")["taskID"]+""} , function( data ) {});
			}else{
				jQuery.post( `http://${globalIP}:4000/api/deleteCanDo`,{"employeeID":""+empID+"","taskID":$.data(tasks[i],"taskdata")["taskID"]+""} , function( data ) {});
			}
		}
		$(this).closest(".centermenu").empty();
		HideCenters();
    });
    
    
    
	$('body').on('click', '#AllCant', function(){
		$('.centermenu#Cando > .menuitem').removeClass("Candotask");
	});
	$('body').on('click', '#AllCan', function(){
		if($('.centermenu#Cando > .menuitem').hasClass("Candotask")){
			$('.centermenu#Cando > .menuitem').removeClass("Candotask");
		}
		$('.centermenu#Cando > .menuitem').addClass("Candotask");
	});

	$('body').on('click','.otherShiftX',function(){
		$(this).parent().empty();
		$('.centermenu#ShiftX').eq(0).append(
			'<div style = "font-size: 4vmin; text-align:left; margin:0 5%" >' +
				'<p>Name: Some Shift</p>' + 
				'<p>Instructions:</p>' +
				'<p>Some InstructionsSome InstructionsSome InstructionsSome InstructionsSome InstructionsSome InstructionsSome InstructionsSome InstructionsSome InstructionsSome Instructions</p>' +
				'<p>Start Time: 12:00 AM</p>' +
				'<p>End Time: 12:00 AM</p>' +
				'<div style= "margin:0 5%">' +
					'<div class="menuitem cancel">' +
						'<p>Cancel</p>' +
					'</div>' +
				'<div class="menuitem acceptShiftX">' +
					'<p>Accept</p>' +
				'</div>' +
			'</div>');
	});
	$('body').on('click','.yourShiftX',function(){
		$(this).parent().empty();
		$('.centermenu#ShiftX').eq(0).append(
			'<div style = "font-size: 4vmin; text-align:left; margin:0 5%" >' +
				'<p>Name: Some Shift</p>' + 
				'<p>Instructions:</p>' +
				'<p>Some InstructionsSome InstructionsSome InstructionsSome InstructionsSome InstructionsSome InstructionsSome InstructionsSome InstructionsSome InstructionsSome Instructions</p>' +
				'<p>Start Time: 12:00 AM</p>' +
				'<p>End Time: 12:00 AM</p>' +
				'<div style= "margin:0 5%">' +
					'<div class="menuitem cancel">' +
						'<p>Cancel</p>' +
					'</div>' +
				'<div class="menuitem acceptShiftX">' +
					'<p>Accept</p>' +
				'</div>' +
			'</div>');
	});
	$('body').on('click', '#TOR > form > div > div.menuitem.submit', function(){
		//debugger;
        newTOR(function(){
            $('.submit').closest(".centermenu").empty() //temporary
            HideCenters();
        }, torAdd,torID);
        torAdd = false;
    });
    $('body').on('click', '#NA > form > div > div.menuitem.submit', function(){
		//debugger;
        newNA(function(){
            $('.submit').closest(".centermenu").empty() //temporary
            HideCenters();
        }, naAdd,empID,ost,oet,osd,oed);
        naAdd = false;
    });
	$('body').on('click', '#Employees > form > div > div >div.menuitem.cancel', function(){
		$(this).closest(".centermenu").empty();
		fillEmp();
		$('.centermenu#Employees').show('fade', {direction: 'right'}, 400);

	});
	$('body').on('click', '#Tasks > form > div >div.menuitem.cancel', function(){
		$(this).closest(".centermenu").empty();
		fillTask();
		$('.centermenu#Tasks').show('fade', {direction: 'right'}, 400);
	});
	$('body').on('click', '#Cando > div >div.menuitem.cancel', function(){
		$(this).closest(".centermenu").empty();
		HideCenters();
		$('.centermenu#Employees').show('fade', {direction: 'right'}, 400);
	});		
    $('body').on('click', '#NA > .back',function(){
    	$('.back').closest(".centermenu").empty()
    	HideCenters();
   		$('.centermenu#Employees').show('fade', {direction: 'right'}, 400);
		$('.slidecover').hide('slide', {direction: 'left'}, 100);
    });
    $('body').on('click', '#NA > form > div > div.menuitem.cancel',function(){
    	$(this).closest(".centermenu").empty()
    	fillNA();
   		$('.centermenu#NA').show('fade', {direction: 'right'}, 400);
		$('.slidecover').hide('slide', {direction: 'left'}, 100);

    });    
    $('body').on('click', '#TOR > form > div > div.menuitem.cancel',function(){
    	$(this).closest(".centermenu").empty()
    	fillTOR();
   		$('.centermenu#TOR').show('fade', {direction: 'right'}, 400);
		$('.slidecover').hide('slide', {direction: 'left'}, 100);

    });
    $('body').on('click', '#ShiftX > div > div > div.menuitem.cancel',function(){
    	$(this).closest(".centermenu").empty()
    	fillShiftX();
   		$('.centermenu#Shiftx').show('fade', {direction: 'right'}, 400);
		$('.slidecover').hide('slide', {direction: 'left'}, 100);

    });      

    $('body').on('change','input[name ="persist"]',function(){
    	//debugger;
    	if(!$("input[name ='deleteAfter']").prop('disabled')){
    		$("input[name ='deleteAfter']").prop('disabled',true);
    	}else{
    		$("input[name ='deleteAfter']").prop('disabled',false);
    	}
    });

});


function newEmployee(f,n,id){
    if(n){
     jQuery.post( `http://${globalIP}:4000/api/signup`, 
                {
                    "first_name":$("input[name = 'first']")[0].value,
                    "middle_name":$("input[name = 'middle']")[0].value, //pass empty string if no middle name
                    "last_name": $("input[name = 'last']")[0].value,
                    "email":$("input[name = 'email']")[0].value,
                    "phone_number":$("input[name = 'phone_number']")[0].value, // (xxx)xxx-xxxx
                    "modify_task":$("input[name = 'modify_task']")[0].checked ? "1": "0", //0 or 1
                    "modify_emp_attr":$("input[name = 'modify_emp_attr']")[0].checked ? "1": "0", //0 or 1
                    "username":"",
                    "password":$("input[name = 'password']")[0].value,
                    "preffered_hours":$("select[name = 'hours']")[0].value

                },
                function(data,status,x){
                    console.log(data,status,x);
                   if(data.code==200){ 
                        console.log(data.code)
                        console.log("nice")
                    }else if(data.code==400){
                        console.log(data.code)
                    }
                    if(f)f();
                },
                "json")
                .fail(function(){

                });
    }else{
             jQuery.post( `http://${globalIP}:4000/api/updateEmployee`, 
                {
					"token":""+localStorage.getItem("token"),
                    "employeeID":""+id,
                    "first_name":$("input[name = 'first']")[0].value,
                    "middle_name":$("input[name = 'middle']")[0].value, //pass empty string if no middle name
                    "last_name": $("input[name = 'last']")[0].value,
                    "email":$("input[name = 'email']")[0].value,
                    "phone_number":$("input[name = 'phone_number']")[0].value, // (xxx)xxx-xxxx
                    "modify_task":$("input[name = 'modify_task']")[0].checked ? "1": "0", //0 or 1
                    "modify_emp_attr":$("input[name = 'modify_emp_attr']")[0].checked ? "1": "0", //0 or 1
                    "username":"",
                    "password":$("input[name = 'password']")[0].value,
                    "preffered_hours":$("select[name = 'hours']")[0].value

                },
                function(data,status,x){
                    console.log(data,status,x);
                   if(data.code==200){ 
                        console.log(data.code)
                        console.log("nice")
                    }else if(data.code==400){
                        console.log(data.code)
                    }
                    if(f)f();
                },
                "json")
                .fail(function(){

                });
    }
}

function newTask(f,n,id){
    if(n){
    	if($("input[name = 'persist']")[0].checked == 1){
			jQuery.post( `http://${globalIP}:4000/api/addTask`, 
		                {
		                    "name":$("input[name = 'name']")[0].value, //integer
		                    "instructions":$("textarea[name = 'instructions']")[0].value, 
		                    "earliest_start": $("input[name = 'earliestStart']")[0].value, //0-24 hr ex: 13:32:00 (hr,min,sec)
		                    "latest_end": $("input[name = 'latestEnd']")[0].value, //24 hr time
		                    "duration":$("input[name = 'duration']")[0].value, //iterations of 30 min ex 1 = 30 min 2 - 60 min
		                    "reqs_in_week":$("input[name = 'repeat']")[0].value, //0-7 how many time within week you want this done
		                    "sunday":$("input[name = 'sun']")[0].checked ? "1": "0", //0 or 1
		                    "monday":$("input[name = 'mon']")[0].checked ? "1": "0", //0 or 1
		                    "tuesday":$("input[name = 'tues']")[0].checked ? "1": "0", //0 or 1
		                    "wednesday":$("input[name = 'wed']")[0].checked ? "1": "0", //0 or 1
		                    "thursday":$("input[name = 'thurs']")[0].checked ? "1": "0", //0 or 1
		                    "friday":$("input[name = 'fri']")[0].checked ? "1": "0", //0 or 1
		                    "saturday":$("input[name = 'sat']")[0].checked ? "1": "0", //0 or 1
		                    "employees_needed":$("input[name = 'numEmps']")[0].value, //integer
		                    "delete_after":null,
		                    "priority":$("select[name = 'priority']")[0].value,

		                },
		                function(data,status,x){
		                    console.log(data,status,x);
		                   if(data.code==200){ 
		                        console.log(data.code)
		                        console.log("nice")
		                    }else if(data.code==400){
		                        console.log(data.code)
		                    }
		                    if(f)f();
		                },
		                "json")
		                .fail(function(){
		                    //$("form").css("background-color","red")
		                });
		}else{
				jQuery.post( `http://${globalIP}:4000/api/addTask`, 
		                {
		                    "name":$("input[name = 'name']")[0].value, //integer
		                    "instructions":$("textarea[name = 'instructions']")[0].value, 
		                    "earliest_start": $("input[name = 'earliestStart']")[0].value, //0-24 hr ex: 13:32:00 (hr,min,sec)
		                    "latest_end": $("input[name = 'latestEnd']")[0].value, //24 hr time
		                    "duration":$("input[name = 'duration']")[0].value, //iterations of 30 min ex 1 = 30 min 2 - 60 min
		                    "reqs_in_week":$("input[name = 'repeat']")[0].value, //0-7 how many time within week you want this done
		                    "sunday":$("input[name = 'sun']")[0].checked ? "1": "0", //0 or 1
		                    "monday":$("input[name = 'mon']")[0].checked ? "1": "0", //0 or 1
		                    "tuesday":$("input[name = 'tues']")[0].checked ? "1": "0", //0 or 1
		                    "wednesday":$("input[name = 'wed']")[0].checked ? "1": "0", //0 or 1
		                    "thursday":$("input[name = 'thurs']")[0].checked ? "1": "0", //0 or 1
		                    "friday":$("input[name = 'fri']")[0].checked ? "1": "0", //0 or 1
		                    "saturday":$("input[name = 'sat']")[0].checked ? "1": "0", //0 or 1
		                    "employees_needed":$("input[name = 'numEmps']")[0].value, //integer
		                    "delete_after":$("input[name = 'deleteAfter']")[0].value,
		                    "priority":$("select[name = 'priority']")[0].value

		                },
		                function(data,status,x){
		                    console.log(data,status,x);
		                   if(data.code==200){ 
		                        console.log(data.code)
		                        console.log("nice")
		                    }else if(data.code==400){
		                        console.log(data.code)
		                    }
		                    if(f)f();
		                },
		                "json")
		                .fail(function(){
		                    //$("form").css("background-color","red")
		                });				
		}
    }else{
    	if($("input[name = 'persist']")[0].checked == 1){
             jQuery.post( `http://${globalIP}:4000/api/updateTask`, 
                {
                    "taskID":""+id,
                    "name":$("input[name = 'name']")[0].value, //integer
                    "instructions":$("textarea[name = 'instructions']")[0].value, 
                    "earliest_start": $("input[name = 'earliestStart']")[0].value, //0-24 hr ex: 13:32:00 (hr,min,sec)
                    "latest_end":$("input[name = 'latestEnd']")[0].value, //24 hr time
                    "duration":$("input[name = 'duration']")[0].value, //iterations of 30 min ex 1 = 30 min 2 - 60 min
                    "reqs_in_week":$("input[name = 'repeat']")[0].value, //0-7 how many time within week you want this done
                    "sunday":$("input[name = 'sun']")[0].checked ? "1": "0", //0 or 1
                    "monday":$("input[name = 'mon']")[0].checked ? "1": "0", //0 or 1
                    "tuesday":$("input[name = 'tues']")[0].checked ? "1": "0", //0 or 1
                    "wednesday":$("input[name = 'wed']")[0].checked ? "1": "0", //0 or 1
                    "thursday":$("input[name = 'thurs']")[0].checked ? "1": "0", //0 or 1
                    "friday":$("input[name = 'fri']")[0].checked ? "1": "0", //0 or 1
                    "saturday":$("input[name = 'sat']")[0].checked ? "1": "0", //0 or 1
                    "employees_needed":$("input[name = 'numEmps']")[0].value, //integer
                    "delete_after":null,
                    "priority":$("select[name = 'priority']")[0].value,
                    "token":""+localStorage.getItem("token")


                },
                function(data,status,x){
                    console.log(data,status,x);
                   if(data.code==200){ 
                        console.log(data.code)
                        console.log("nice")
                    }else if(data.code==400){
                        console.log(data.code)
                    }
                    if(f)f();
                },
                "json")
                .fail(function(){

                });
        }else{
            jQuery.post( `http://${globalIP}:4000/api/updateTask`, 
                {
                    "taskID":""+id,
                    "name":$("input[name = 'name']")[0].value, //integer
                    "instructions":$("textarea[name = 'instructions']")[0].value, 
                    "earliest_start": $("input[name = 'earliestStart']")[0].value, //0-24 hr ex: 13:32:00 (hr,min,sec)
                    "latest_end":$("input[name = 'latestEnd']")[0].value, //24 hr time
                    "duration":$("input[name = 'duration']")[0].value, //iterations of 30 min ex 1 = 30 min 2 - 60 min
                    "reqs_in_week":$("input[name = 'repeat']")[0].value, //0-7 how many time within week you want this done
                    "sunday":$("input[name = 'sun']")[0].checked ? "1": "0", //0 or 1
                    "monday":$("input[name = 'mon']")[0].checked ? "1": "0", //0 or 1
                    "tuesday":$("input[name = 'tues']")[0].checked ? "1": "0", //0 or 1
                    "wednesday":$("input[name = 'wed']")[0].checked ? "1": "0", //0 or 1
                    "thursday":$("input[name = 'thurs']")[0].checked ? "1": "0", //0 or 1
                    "friday":$("input[name = 'fri']")[0].checked ? "1": "0", //0 or 1
                    "saturday":$("input[name = 'sat']")[0].checked ? "1": "0", //0 or 1
                    "employees_needed":$("input[name = 'numEmps']")[0].value, //integer
                    "delete_after":$("input[name = 'deleteAfter']")[0].value,
                    "priority":$("select[name = 'priority']")[0].value,
                    "token":""+localStorage.getItem("token")


                },
                function(data,status,x){
                    console.log(data,status,x);
                   if(data.code==200){ 
                        console.log(data.code)
                        console.log("nice")
                    }else if(data.code==400){
                        console.log(data.code)
                    }
                    if(f)f();
                },
                "json")
                .fail(function(){

                });
            }
    }
}

function newTOR(f,n,id){
	if(n){
		jQuery.post( `http://${globalIP}:4000/api/addTOR`, 
		                {
		                    "employeeID":""+localStorage.getItem("userID"), //integer
		                    "subject":$("input[name = 'Subject']")[0].value, 
		                    "reason": $("textarea[name = 'Reason']")[0].value, 
		                    "start_time": $("input[name = 'StartT']")[0].value, 
		                    "end_time":$("input[name = 'EndT']")[0].value, 
		                    "start_date": $("input[name = 'StartD']")[0].value, //24 hr time
		                    "end_date":$("input[name = 'EndD']")[0].value, 
		                    "request_status":"i",
		                    "supervisor_comment":"",
		                },
		                function(data,status,x){
		                    console.log(data,status,x);
		                   if(data.code==200){ 
		                        console.log(data.code)
		                        console.log("nice")
		                    }else if(data.code==400){
		                        console.log(data.code)
		                    }
		                    if(f)f();
		                },
		                "json")
		                .fail(function(){

		                });
	}else{
             jQuery.post( `http://${globalIP}:4000/api/updateTOR`, 
                {
                    "employeeID":""+localStorage.getItem("userID"), //integer
                    "subject":$("input[name = 'Subject']")[0].value, 
                    "reason": $("textarea[name = 'Reason']")[0].value, 
                    "start_time": $("input[name = 'StartT']")[0].value, 
                    "end_time":$("input[name = 'EndT']")[0].value, 
                    "start_date": $("input[name = 'StartD']")[0].value, //24 hr time
                    "end_date":$("input[name = 'EndD']")[0].value, 
                    "request_status":"i",
                    "supervisor_comment":"",
                },
                function(data,status,x){
                    console.log(data,status,x);
                   if(data.code==200){ 
                        console.log(data.code)
                        console.log("nice")
                    }else if(data.code==400){
                        console.log(data.code)
                    }
                    if(f)f();
                },
                "json")
                .fail(function(){
                });
    }
}
function newNA(f,n,id,ost,oet,osd,oed){
	if(n){
		jQuery.post( `http://${globalIP}:4000/api/addNotAvailable`, 
		                {
		                    "employeeID":""+id, //integer
		                    "start_time": $("input[name = 'StartT']")[0].value, 
		                    "end_time":$("input[name = 'EndT']")[0].value, 
		                    "start_date": $("input[name = 'StartD']")[0].value, //24 hr time
		                    "end_date":$("input[name = 'EndD']")[0].value, 
		                    "day":$("select[name = 'day']")[0].value
		                },
		                function(data,status,x){
		                    console.log(data,status,x);
		                   if(data.code==200){ 
		                        console.log(data.code)
		                        console.log("nice")
		                    }else if(data.code==400){
		                        console.log(data.code)
		                    }
		                    if(f)f();
		                },
		                "json")
		                .fail(function(){
		                });
	}else{
 		jQuery.post( `http://${globalIP}:4000/api/updateNotAvailable`, 
		                {
		                    "employeeID":""+id, //integer
		                    "old_start_time":""+ost, 
		                    "old_end_time":""+oet, 
		                    "old_start_date":""+osd, //24 hr time
		                    "old_end_date":""+oed, 		                    
		                    "start_time": $("input[name = 'StartT']")[0].value, 
		                    "end_time":$("input[name = 'EndT']")[0].value, 
		                    "start_date": $("input[name = 'StartD']")[0].value, //24 hr time
		                    "end_date":$("input[name = 'EndD']")[0].value, 
		                    "day":$("select[name = 'day']")[0].value
		                },
		                function(data,status,x){
		                    console.log(data,status,x);
		                   if(data.code==200){ 
		                        console.log(data.code)
		                        console.log("nice")
		                    }else if(data.code==400){
		                        console.log(data.code)
		                    }
		                    if(f)f();
		                },
		                "json")
		                .fail(function(){
		                });
    }
}