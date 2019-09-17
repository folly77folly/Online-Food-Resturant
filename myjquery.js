
$(document).ready(function(){
	// $(.myelement).mouseenter(function (){
	// 	this.animate(pulse);
	// });
	
function mydate(){

	var dt = new Date();
// ensure date comes as 01, 09 etc
var DD = ("0" + dt.getDate()).slice(-2);

// getMonth returns month from 0
var MM = ("0" + (dt.getMonth() + 1)).slice(-2);

var YYYY = dt.getFullYear();

var hh = ("0" + dt.getHours()).slice(-2);

var mm = ("0" + dt.getMinutes()).slice(-2);

var ss = ("0" + dt.getSeconds()).slice(-2);

var date_string = YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
return date_string
}

	var $orders=$('#orders');
	var $categories=$('#categories');
	var $foodList=$('#foodList');
	$.ajax({
		type: 'GET',
		url:'http://localhost:3000/users',
		success:function(users){
			console.log('success',users);
			$.each(users,function(i,users){
				$orders.append('<li>name : '+ users.first_name + ',email:'+ users.email +'</li>');
			})
		},error :function(){
			alert("error loading users");
		}
	});

	



});