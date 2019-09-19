
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




	//This is where to add new food item

	$("#submitFood").click(function(){
		var fileName = document.getElementById('avatar').files[0].name;
		var catid= $('#categories').val();
		var foodName= $('#foodName').val();
		var foodPrice=$('#foodPrice').val();
		var description=$('#description').val();
		var pixPath=$('#avatar').val();
		var dateAdded=Date.now();
		// alert(pixPath);
		// alert(fileName);
		if (catid==0){
			alert('Select a category to continue');
		}else if (foodName==""){
			alert('Enter Food Name to Continue');
		}else if (foodPrice=="" || isNaN(foodPrice)){
			alert('Enter Correct Price of the Food to Continue');
		}else if (description==""){
			alert('Enter description of the Food to Continue!!');
		}else{
			//do singup
		var foodItem={"categoryId":Number(catid),
		"food_name":foodName,
		"price":foodPrice,
		"description":description,
		"picture_name":fileName,
		"created":mydate()
		}
			$.ajax({
				type:'POST',
				url:'http://localhost:3000/menus',
				data:foodItem,
				success:function(){
					alert(foodName+' is created successfully');
					window.location.href="admin.html";
				},
				error:function(){
					alert('error creating your Profile');
				}
			})	
		}
	});	


	//this is to show all food
	$('#showAllFoods').click(function(){
		$.ajax({
			type: 'GET',
			url:'http://localhost:3000/menus?_sort=food_name&_order=asc',
			success:function(menus){
				console.log('success',menus);
				$.each(menus,function(i,menus){
					$foodList.append('<tr><td>'+menus["food_name"]+'<td><td>'+menus["price"]+'<td></tr>');
				})
			},error :function(){
				alert("error loading users");
			}
		});

	});


	  ////this is to delete individual food
	  $foodList.delegate('.viewdetails','click',function(){
		// alert('Delete deatils');
		$('#'+$(this).attr('data-id')).hide(1000);
		$.ajax({
			type: 'DELETE',
			url:'http://localhost:3000/menus/'+ $(this).attr('data-id')

		});
	  })
	  
	  ////this is to view individual food
	  $foodList.delegate('.edidetails','click',function(){
		  var $nameOfFood=$('#nameOfFood')
		  var $desOfFood=$('#desOfFood')
		  var $foodPic=$('#foodPic')
		  var $priceOfFood=$('#priceOfFood')
		// alert('view deatils');
		$.ajax({
			type: 'GET',
			url:'http://localhost:3000/menus/'+ $(this).attr('data-id'),
			success:function(menus){
				console.log(menus["food_name"]);
				$nameOfFood.html(menus["food_name"]);
				$desOfFood.html(menus["description"]);
				$priceOfFood.html(menus["price"]);
				$foodPic.attr('src',"images/"+menus["picture_name"]);
			}

		});
	  })
	  //view to edit food
	  $foodList.delegate('.editFood','click',function(){
		var $category=$('#categories');
		var $nameOfFood=$('#foodName');
		var $priceOfFood=$('#priceOfFood');
		var $desOfFood=$('#description');
		var $foodPic=$('#foodPic2');
		var $picName=$('#avatar1');
		var $foodid=$('#foodid');
	  $.ajax({
		  type: 'GET',
		  url:'http://localhost:3000/menus/'+ $(this).attr('data-id'),
		  success:function(menus){
			  console.log(menus["price"]);
			  $category.val(menus["categoryId"])
			  $nameOfFood.val(menus["food_name"]);
			  $foodid.val(menus["id"]);
			  $priceOfFood.val(menus["price"]);
			  $desOfFood.val(menus["description"]);
			  $foodPic.attr('src',"images/"+menus["picture_name"]);
		  }

	  });
	})


	///to update a food
	$("#updateFood").click(function(){
		if(document.getElementById("avatar1").value != "") {
			// you have a file
			var fileName = document.getElementById('avatar1').files[0].name;
		 }else{
			var fileName ="default,jpeg";
		 }
		
		var catid= $('#categories').val();
		var foodName= $('#foodName').val();
		var foodPrice=$('#priceOfFood').val();
		var description=$('#description').val();
		var pixPath=$('#avatar').val();
		var dateAdded=Date.now();
		var foodid=$('#foodid').val();
		// alert(pixPath);
		// alert(fileName);
		if (catid==0){
			alert('Select a category to continue');
		}else if (foodName==""){
			alert('Enter Food Name to Continue');
		}else if (foodPrice=="" || isNaN(foodPrice)){
			alert('Enter Price of the Food to Continue');
		}else if (description==""){
			alert('Enter description of the Food to Continue!!');
		}else{
		
		var foodItem={"categoryId":catid,
		"food_name":foodName,
		"price":foodPrice,
		"description":description,
		"picture_name":fileName,
		"created":mydate()
		}
			$.ajax({
				type:'PATCH',
				url:'http://localhost:3000/menus/'+foodid,
				data:foodItem,
				success:function(){
					alert(foodName+' is Updated successfully');
					window.location.href='search.html'
				},
				error:function(){
					alert('error creating your Profile');
				}
			})	
		}
	});





	


	//log-out users
	$('#logout').click(function(){
		// alert('show all');
		localStorage.removeItem("email");
		window.location.href = 'index.html'

	});

//// to select an orders
	  $('#bigrow').delegate('.showfood','click',function(){
		var $nameOfFood=$('#nameOfFood')
		var $priceOfFood=$('#priceOfFood')
		var $desOfFood=$('#desOfFood')
		var $foodPic=$('#foodPic')
		var $foodid=$('#foodid')
		//   alert($(this).attr('id'))

	  $.ajax({
		  type: 'GET',
		  url:'http://localhost:3000/menus/'+ $(this).attr('id'),
		  success:function(menus){
				$nameOfFood.html(menus["food_name"]);
				$desOfFood.html(menus["description"]);
				$priceOfFood.html(menus["price"]);
				$foodid.val(menus["id"]);
				$foodPic.attr('src',"images/"+menus["picture_name"]);
		  }

	  });
	})

	$('#bigrow2').delegate('.showfood','click',function(){
		var $nameOfFood=$('#nameOfFood')
		var $priceOfFood=$('#priceOfFood')
		var $desOfFood=$('#desOfFood')
		var $foodPic=$('#foodPic')
		var $foodid=$('#foodid')
		//   alert($(this).attr('id'))

	  $.ajax({
		  type: 'GET',
		  url:'http://localhost:3000/menus/'+ $(this).attr('id'),
		  success:function(menus){
				$nameOfFood.html(menus["food_name"]);
				$desOfFood.html(menus["description"]);
				$priceOfFood.html(menus["price"]);
				$foodid.val(menus["id"]);
				$foodPic.attr('src',"images/"+menus["picture_name"]);
		  }

	  });
	})



	$('#bigrow3').delegate('.showfood','click',function(){
		var $nameOfFood=$('#nameOfFood')
		var $priceOfFood=$('#priceOfFood')
		var $desOfFood=$('#desOfFood')
		var $foodPic=$('#foodPic')
		var $foodid=$('#foodid')
		//   alert($(this).attr('id'))

	  $.ajax({
		  type: 'GET',
		  url:'http://localhost:3000/menus/'+ $(this).attr('id'),
		  success:function(menus){
				$nameOfFood.html(menus["food_name"]);
				$desOfFood.html(menus["description"]);
				$priceOfFood.html(menus["price"]);
				$foodid.val(menus["id"]);
				$foodPic.attr('src',"images/"+menus["picture_name"]);
		  }

	  });
	})





});