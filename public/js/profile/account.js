jQuery(document).ready(function ($) {
    let updateAccountForm = $("#updateAccountForm");
    let firstName = $("#firstName");
    let lastName = $("#lastName");
    let dateOfBirth = $("#dateOfBirth");
    let username = $("#username");
    let email = $("#email");
    let street = $("#street");
    let aptNo = $("#aptNo");
    let zipCode = $("#zipCode");
    let state = $("#state");
    let town = $("#town");
    let country = $("#country");
    let error = document.getElementById("error");
    let deleteButton = document.getElementById('deleteBtn');

    updateAccountForm.submit(function (event) {
        event.preventDefault();
        // guys remember to error check the input data
        let requestConfig = {
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

    deleteButton.addEventListener('click', function() {
        let requestConfig = {
            method: "DELETE",
            url: `/../users/`,
            contentType: "application/json",
        };
        $.ajax(requestConfig).then(function (responseMessage) {
            console.log(responseMessage)
            if (responseMessage.error) {
                console.log(responseMessage.error)
            } else {
                window.location.href = "/users/signout";
            }
        });
    });
});
