function logoutFunction(){
	window.location.href = "login.html";
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
}
$(document).ready(function() {
	var edit = true;
	if(!edit) $("body > div.slidecover > div:nth-child(1)").hide('fade', {direction: 'right'}, 1);

	$('.floatdiv').click(function(){
		$('.slidecover').toggle('slide', {direction: 'left'}, 400);
		HideCenters();
	});

	$('body > div.slidecover > div:nth-child(1)').click(function(){	//click task list
		$('.centermenu#Tasks').show('fade', {direction: 'right'}, 400);
		$('.slidecover').hide('slide', {direction: 'left'}, 100);

		if($(".centermenu#Tasks").children().length==0){
			for(var i=0;i<20;i++){
				var taskitem = document.createElement("div");
				taskitem.classList.add("menuitem");
				taskitem.innerHTML="<p>Task "+i+"</p>"
				$(".centermenu#Tasks")[0].append(taskitem);
			}
		}
	});


	$('body > div.slidecover > div:nth-child(2)').click(function(){//click employee list
		$('.centermenu#Employees').show('fade', {direction: 'right'}, 400);
		$('.slidecover').hide('slide', {direction: 'left'}, 100);
		if($(".centermenu#Employees").children().length==0){
           	
            jQuery.get( "http://54.183.177.213:4000/api/getAllEmployees", function( data ) {
								
                for(var i=0;i<data.length;i++){
                    var empitem = document.createElement("div");
                    empitem.classList.add("menuitem");
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
	});

	$('body > div.slidecover > div:nth-child(3)').click(function(){//click TOR
		$('.centermenu#TOR').empty();
		$('.centermenu#TOR').show('fade', {direction: 'right'}, 400);
		$('.slidecover').hide('slide', {direction: 'left'}, 100);
		var clone = $("#torform").clone(true);
		clone.attr("id","");
		clone.show();
		$(".centermenu#TOR").append(clone)

	});
	$('body > div.slidecover > div:nth-child(4)').click(function(){//click shift exchange
		$('.centermenu#ShiftX').show('fade', {direction: 'right'}, 400);
		$('.slidecover').hide('slide', {direction: 'left'}, 100);
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
			$(".centermenu#ShiftX").eq(0).append(
				'<p></p>' +
				'<div style= "margin:0 5%">' +
					'<div class="menuitem cancel">' +
						'<p>Cancel</p>' +
					'</div>' +
					'<div class="menuitem submit">'+
						'<p>Submit</p>'+
					'</div>'+
				'</div>');
		}
	});

	$('body > div.slidecover > div:nth-child(5)').click(function(){//click settings

	});
	$('#Candobutton').click(function(){
		$('.centermenu#Employees').hide('fade', {direction: 'right'}, 100);
		$('.centermenu#Cando').show('fade', {direction: 'right'}, 400);
		if($(".centermenu#Cando").children().length==0){
			$(".centermenu#Cando").eq(0).append(
				"<div class ='headContainer'>This employee will be assigned green tasks, click 'All' to select all tasks, click 'None' to deselect all tasks.</div>" +				
					"<div>" +
						"<div class ='Legend' id ='AllCan'>All</div><div class ='Legend' id ='AllCant'>None</div>" +
					"</div>");
			for(var i=0;i<20;i++){
				var canitem = document.createElement("div");
				canitem.classList.add("Cantdotask");
				canitem.classList.add("menuitem");
				canitem.innerHTML="<p>Task "+i+"</p>"
				$(".centermenu#Cando")[0].append(canitem);
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
		}
	});




	$('body').on('click', '.centermenu#Cando > .menuitem', function(){
		$(this).toggleClass("Candotask",200);
	});


	$('body').on('click', '.centermenu#Employees > .menuitem', function(){
        //console.log($(this)[0]);
        //console.log(jQuery.data($(this)[0],"empdata"));
        var id = jQuery.data($(this)[0],"empdata")["employeeID"];
        var first = jQuery.data($(this)[0],"empdata")["first_name"];
        var middle = jQuery.data($(this)[0],"empdata")["middle_name"];
        var last = jQuery.data($(this)[0],"empdata")["last_name"];
        var email = jQuery.data($(this)[0],"empdata")["email"];
        //var password = jQuery.data($(this)[0],"empdata")["password_hash"];
        var phone = jQuery.data($(this)[0],"empdata")["phone_number"];
        var attr = jQuery.data($(this)[0],"empdata")["modify_emp_attr"];
        var task = jQuery.data($(this)[0],"empdata")["modify_task"];
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
        
        if(attr){
           $(clone).find("input[name='modify_task']").eq(0)[0].checked="checked";
        }
        
        if(task){
            $(clone).find("input[name='modify_emp_attr']").eq(0)[0].checked="checked";
        }

        
		$(".centermenu#Employees").append(clone)
		
	});

	$('body').on('click', '.centermenu#Tasks > .menuitem', function(){
		//debugger;
		var data = $(this).find("p")[0].innerHTML;
		$(this).parent().empty();

		var clone = $("#taskform").clone();
		clone.attr("id","");
		clone.show();
		
		$(clone).find("input[name='Name']").eq(0)[0].value=data;
		$(".centermenu#Tasks").append(clone)
	});
    

//	$('body').on('click', '.menuitem.cancel', function(){
//		$(this).closest(".centermenu").empty();
//		HideCenters();
//	});
//    
//	$('body').on('click', '.menuitem.submit', function(){
//		$(this).closest(".centermenu").empty();
//		HideCenters();
//	});
    
	$('body').on('click', '.menuitem.cancel', function(){
		$(this).closest(".centermenu").empty();
		HideCenters();
	});
    
	$('body').on('click', '#Employees > form > div > div > div.menuitem.submit', function(){
		debugger;
        newEmployee(function(){
            $(this).closest(".centermenu").empty();
            HideCenters();
        }, false,0);
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
});

function newEmployee(f,n,id){
    if(n){
     jQuery.post( "http://54.183.177.213:4000/api/signup", 
                {
                    "first_name":$("input[name = 'first']")[0].value,
                    "middle_name":$("input[name = 'middle']")[0].value, //pass empty string if no middle name
                    "last_name": $("input[name = 'last']")[0].value,
                    "email":$("input[name = 'email']")[0].value,
                    "phone_number":$("input[name = 'phone_number']")[0].value, // (xxx)xxx-xxxx
                    "modify_task":$("input[name = 'modify_task']")[0].checked ? "1": "0", //0 or 1
                    "modify_emp_attr":$("input[name = 'modify_emp_attr']")[0].checked ? "1": "0", //0 or 1
                    "username":"",
                    "password":$("input[name = 'password']")[0].value

                },
                function(data,status,x){
                    console.log(data,status,x);
                   if(data.code==200){ 
                        console.log(data.code)
                        console.log("nice")
                        //$("form").css("background-color","green")
                        //document.location.href = "Mockup.html";
                    }else if(data.code==400){
                        console.log(data.code)
                        //$("form").css("background-color","yellow")
                    }
                    if(f)f();
                },
                "json")
                .fail(function(){
                    //$("form").css("background-color","red")
                });
    }else{
             jQuery.post( "http://54.183.177.213:4000/api/updateEmployee", 
                {
                    "employeeID":""+id,
                    "first_name":$("input[name = 'first']")[0].value,
                    "middle_name":$("input[name = 'middle']")[0].value, //pass empty string if no middle name
                    "last_name": $("input[name = 'last']")[0].value,
                    "email":$("input[name = 'email']")[0].value,
                    "phone_number":$("input[name = 'phone_number']")[0].value, // (xxx)xxx-xxxx
                    "modify_task":$("input[name = 'modify_task']")[0].checked ? "1": "0", //0 or 1
                    "modify_emp_attr":$("input[name = 'modify_emp_attr']")[0].checked ? "1": "0", //0 or 1
                    "username":"",
                    "password":$("input[name = 'password']")[0].value

                },
                function(data,status,x){
                    console.log(data,status,x);
                   if(data.code==200){ 
                        console.log(data.code)
                        console.log("nice")
                        //$("form").css("background-color","green")
                        //document.location.href = "Mockup.html";
                    }else if(data.code==400){
                        console.log(data.code)
                        //$("form").css("background-color","yellow")
                    }
                    if(f)f();
                },
                "json")
                .fail(function(){
                    //$("form").css("background-color","red")
                });
    }
}
