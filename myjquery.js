
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

	
	$.ajax({
		type: 'GET',
		url:' http://localhost:3000/categories',
		success:function(categories){
			console.log('s',categories);
			$.each(categories,function(i,categories){
				// console.log(categories[catname]);
			$categories.append('<option value='+categories["id"]+'>'+categories["catname"]+'</option>');
			 })
		},error :function(){
			alert("error loading users");
		}
	});

	$("#savedetails").click(function(){
		var fname= $('#fname').val();
		var lname= "aqim";
		var email=$('#email').val();
		var data={"first_name":fname,
				"last_name":lname,
				"email":email
				}
		$.ajax({
			type:"POST",
			url:'http://localhost:3000/users',
			data:data,
			success:function(users){
				alert("users added");
			}
		});
	});

	$("#signUp").click(function(){
		var email= $('#modalLRInput12').val();
		var password= $('#modalLRInput13').val();
		var passwordConfirm=$('#modalLRInput14').val();
		if (email==""){
			alert('Enter Email to Continue');
		}else if (password==""){
			alert('Enter Password to Continue');
		}else if (passwordConfirm==""){
			alert('Confirm Password to Continue');
		}else if (passwordConfirm!==password){
			alert('Your Password do not Match!!');
		}else{
			//do singup
		var users={"email":email,
		"password":password,
		"role":"users"
		}
			$.ajax({
				type:'POST',
				url:'http://localhost:3000/users',
				data:users,
				success:function(){
					alert(email+' your Profile is created successfully');
					$('#modalLRInput12').val ="";
					$('#modalLRInput13').val ="";
					$('#modalLRInput14').val ="";
					localStorage.setItem("email", email);
					window.location.href='userdashboard.html'
				},
				error:function(){
					alert('error creating your Profile');
				}
			})	
		}
	});


	$("#signIn").click(function(){
		var email= $('#modalLRInput10').val();
		var password= $('#modalLRInput11').val();
		if (email==""){
			alert('Enter Email to Continue');
		}else if (password==""){
			alert('Enter Password to Continue');
		}else{
			//do singup
			$.ajax({
				type:'GET',
				url:'http://localhost:3000/users?email='+email +'& password='+password,
				success:function(users){
					console.log(users);
					console.log(users[0]["role"]);
					if (users.length===1 && users[0]["role"]==="users"){
					// alert('correct');
					localStorage.setItem("email", email);
					window.location.href = 'userdashboard.html'
					}else if((users.length===1 && users[0]["role"]==="admin")){
					localStorage.setItem("email", "ADMIN");
					window.location.href = 'admin.html'
					}
					else{
					alert('Incorrect Username or Password');
					}
				},
				error:function(){
					alert('error creating your Profile');
				}
			})	
		}
	});


});