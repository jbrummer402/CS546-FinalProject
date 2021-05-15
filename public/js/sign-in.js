jQuery(document).ready(function ($) {
  let signinForm = $("#signinForm"),
    username = $("#username"),
    password = $("#password"),
    error = $("#error"),
    createAccount = $("#createAcc"),
    signInstead = $("#signInstead"),
    signinLink = $('#to-signin');

  let signupForm = $("#signupForm"),
    firstName = $("#firstName"),
    lastName = $("#lastName"),
    dateOfBirth = $("#dateOfBirth"),
    username2 = $("#username2"),
    password2 = $("#password2"),
    email = $("#email"),
    street = $("#street"),
    aptNo = $("#aptNo"),
    zipCode = $("#zipCode"),
    state = $("#state"),
    town = $("#town"),
    country = $("#country");

  let loginErrorDiv = $('#loginError');
  loginErrorDiv.hide();
  let loginErrorDivList = $('#loginErrorList');

  let signUpErrorDiv = $('#signUpError');
  signUpErrorDiv.hide();
  let signUpErrorDivList = $('#signUpErrorList');

  signinLink.hide();

  createAccount.on("click", function (event) {
    signupForm.show();
    signInstead.show();
    signinForm.hide();
    createAccount.hide();
  });

  signInstead.on("click", function (event) {
    loginErrorDiv.hide();
    signUpErrorDiv.hide();
    signinForm.show();
    createAccount.show();
    signupForm.hide();
    signInstead.hide();
  });

  signinForm.submit(function (event) {
    event.preventDefault();

    loginErrorDiv.hide();
    loginErrorDivList.empty();
    let errList = [];
    if(username.val().trim() === "") errList.push('Please enter a username');
    if(password.val().trim() === "") errList.push('Please enter a password');


    var requestConfig = {
      method: "POST",
      url: `/users/signin`,
      contentType: "application/json",
      data: JSON.stringify({
        username: username.val(),
        password: password.val(),
      }),
    };

    if(errList.length > 0){
      for(let err of errList){
        loginErrorDivList.append(`<li class='loginError'>${err}</li>`);
      }
      loginErrorDiv.show();
    }
    else{
      $.ajax(requestConfig).then(function (responseMessage) {
        console.log(responseMessage);
        if (responseMessage.success === true) {
          window.location.href = "/profile/account";
        } else {
          loginErrorDivList.empty();
          loginErrorDiv.show();
          loginErrorDivList.append(`<li class='loginError'>Incorrect username or password</li>`);
          signinForm.trigger("reset");
        }
      });
    }
    
  });

  signupForm.submit(function (event) {
    event.preventDefault();
    signUpErrorDiv.hide();
    signUpErrorDivList.empty();

    let errList = [];
    if(firstName.val().trim()==='') errList.push('First Name can not be blank');
    if(lastName.val().trim()==='') errList.push('Last Name can not be blank');
    if(username2.val().trim()==='') errList.push('Username can not be blank');
    if(password2.val().trim()==='') errList.push('Password can not be blank');
    if(!dateOfBirth.val().trim()) errList.push('Please enter date of birth');
    if(!( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.val().trim()))) errList.push('Invalid Email format');
    if(street.val().trim()==='') errList.push('Street can not be blank');
    if(!(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode.val().trim())))  errList.push('Zipcode not in valid format');
    if(state.val().trim()==='') errList.push('State can not be blank');
    if(town.val().trim()==='') errList.push('Town can not be blank');
    if(country.val().trim()==='') errList.push('Country can not be blank');

    const fd = new FormData($("#signupForm").get(0));   

    var requestConfig = {
      method: "POST",
      url: "/users",
      processData: false,
      contentType: false,
      data: fd
    };

    if(errList.length > 0){
      for(let err of errList){
        signUpErrorDivList.append(`<li class='accountCreationError'>${err}</li>`);
      }
      signUpErrorDiv.show();
    }
    else{
      // past our client side checking
      $.ajax(requestConfig).then(function (responseMessage) {
        if (responseMessage.error) {
          // error server side with user input
          signUpErrorDivList.empty();
          signUpErrorDivList.append(`<li class='accountCreationError'>${responseMessage.error}</li>`);
          signUpErrorDiv.show();
        } else {
          window.location.href = "/profile/account";
        }
      });
    }
    
  });
});
