$(function(){
	$.extend(WorkoutLog, {
		//signup method
		signup: function() {
			//username and password variables
			let username = $("#su_username").val().trim();
			let password = $("#su_password").val().trim();
			if (username === "" || password === "" ) {
				$("#su_error").text("Please enter a username and password").show();
			} else {
				//user object
				let user = {
					user: {
						username: username,
						password: password
					}
				};

				//signup post
				let signup = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "user",
					data: JSON.stringify(user),
					contentType: "application/json"
				});

				//signup done/fail
				signup.done(function(data){
					if (data.sessionToken) {
						WorkoutLog.setAuthHeader(data.sessionToken);
						WorkoutLog.definition.fetchAll();
						WorkoutLog.log.fetchAll();
					};
					$("#signup-modal").modal("hide");
					$(".disabled").removeClass("disabled");
					$(".nav").removeClass("hidden");
					$(".nav").show();
					$("#su_username").val("");
					$("#su_password").val("");
					$("#su_error").hide();
					$('a[href="#define"]').tab("show"); //routing
				}).fail(function() {
					$("#su_error").text("There was an issue with sign up").show();
					$("#su_username").val("");
					$("#su_password").val("");
				})
			} 
		},

		//login method
		login: function() {
			//login variables
			let username = $("#li_username").val().trim();
			let password = $("#li_password").val().trim();
			if (username === "" || password === "") {
				$("#li_error").text("Please enter a username and password").show();
			} else {
				let user = {
					user: {
						username: username,
						password: password
					}
				};

				//login POST
				let login = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "login",
					data: JSON.stringify(user),
					contentType: "application/json"
				})
				//login done/fail
				login.done(function(data) {
					if (data.sessionToken) {
						WorkoutLog.setAuthHeader(data.sessionToken);
						WorkoutLog.definition.fetchAll();
						WorkoutLog.log.fetchAll();
					}
					$("#login-modal").modal("hide");
					$(".disabled").removeClass("disabled");
					$(".nav").removeClass("hidden");
					$(".nav").show();
					$("#li_username").val("");
					$("#li_password").val("");
					$("#li_error").hide();
					$('a[href="#define"]').tab("show");
				}).fail(function (){
					$("#li_error").text("Unable to login.").show();
					$("#li_username").val("");
					$("#li_password").val("");
				})
			}						
		},
		//loginoutmethod
		logout: function() {
			if (window.localStorage.getItem("sessionToken")) {
				window.localStorage.removeItem("sessionToken");
			}
			$(".nav").hide().addClass("disabled");
			$('a[href="#loginPage"]').tab("show");
		}
	});
		//bind events
		$("#login").on("click", WorkoutLog.login);
		$("#signup").on("click", WorkoutLog.signup);
		$("#logout").on("click", WorkoutLog.logout);
})