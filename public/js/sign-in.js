jQuery(document).ready(function ($) {
  var signinForm = $("#signinForm"),
    username = $("#username"),
    password = $("#password"),
    error = $("#error"),
    createAccount = $("#createAcc"),
    signupForm = $("#signupForm"),
    signInstead = $("#signInstead");

  var signupForm = $("#signupForm"),
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

  createAccount.on("click", function (event) {
    signupForm.show();
    signInstead.show();
    signinForm.hide();
    createAccount.hide();
  });

  signInstead.on("click", function (event) {
    signinForm.show();
    createAccount.show();
    signupForm.hide();
    signInstead.hide();
  });

  signinForm.submit(function (event) {
    event.preventDefault();

    if (username.val().trim() === "") {
      error.show();
      signinForm.trigger("reset");
      return;
    }

    var requestConfig = {
      method: "POST",
      url: `/users/signin`,
      contentType: "application/json",
      data: JSON.stringify({
        username: username.val(),
        password: password.val(),
      }),
    };

    $.ajax(requestConfig).then(function (responseMessage) {
      console.log(responseMessage);
      if (responseMessage.success === true) {
        window.location.href = "/profile/account";
      } else {
        error.show();
        signinForm.trigger("reset");
      }
    });
  });

  signupForm.submit(function (event) {
    event.preventDefault();

    var requestConfig = {
      method: "POST",
      url: "/users",
      contentType: "application/json",
      data: JSON.stringify({
        firstName: firstName.val(),
        lastName: lastName.val(),
        dateOfBirth: dateOfBirth.val(),
        username: username2.val(),
        password: password2.val(),
        email: email.val(),
        address: {
          street: street.val(),
          aptNo: aptNo.val(),
          zipCode: zipCode.val(),
          state: state.val(),
          town: town.val(),
          country: country.val(),
        },
      }),
    };
    $.ajax(requestConfig).then(function (responseMessage) {
      if (responseMessage.error) {
        error.innerHTML = responseMessage.error;
        error.hidden = false;
      } else {
        window.location.href = "/profile/account";
      }
    });
  });
});
