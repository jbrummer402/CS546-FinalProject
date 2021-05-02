jQuery(document).ready(function ($) {
  var signinForm = $("#signinForm"),
    username = $("#username"),
    password = $("#password"),
    error = $("#error");

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
        window.location.href = "/users/profile";
      }
    });
  });
});
