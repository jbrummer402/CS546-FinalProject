jQuery(document).ready(function ($) {
  var updateAccountForm = $("#updateAccountForm");
  firstName = $("#firstName");
  lastName = $("#lastName");
  dateOfBirth = $("#dateOfBirth");
  username = $("#username");
  email = $("#email");
  street = $("#street");
  aptNo = $("#aptNo");
  zipCode = $("#zipCode");
  state = $("#state");
  town = $("#town");
  country = $("#country");
  error = document.getElementById("error");

  updateAccountForm.submit(function (event) {
    event.preventDefault();
    // guys remember to error check the input data
    var requestConfig = {
      method: "POST",
      url: updateAccountForm.attr("action"),
      contentType: "application/json",
      data: JSON.stringify({
        firstName: firstName.val(),
        lastName: lastName.val(),
        dateOfBirth: dateOfBirth.val(),
        username: username.val(),
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
