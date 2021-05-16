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
    let errorDiv = $('#updateFormError');
    errorDiv.hide();
    let errorDivList = $('#errorList');
    let deleteButton = document.getElementById('deleteBtn');
    let userid = $('#currentUser').attr('title');
    let profilePicUpdateBtn = $('#profilePicUpdateSubmitBtn');
    let photoUpdateErrorDiv = $('#photoUpdateError');
    let photoUpdateSuccessDiv = $('#photoUpdateSuccess');
    photoUpdateErrorDiv.hide();
    photoUpdateSuccessDiv.hide();
    let updateSuccessDiv = $('#updateSuccess');
    updateSuccessDiv.hide();

    $(document).on('submit', '#picUpdateForm', async (e) => {
        e.preventDefault();
        photoUpdateErrorDiv.empty();
        photoUpdateErrorDiv.hide();
        photoUpdateSuccessDiv.hide();
        const fd = new FormData($("#picUpdateForm").get(0));   

        var requestConfig = {
            method: "PATCH",
            url: `/users/pic/${userid}`,
            processData: false,
            contentType: false,
            data: fd
        };
        
        try{
            let result;
            result = await $.ajax(requestConfig);
            window.location.href = "/profile/account";
            photoUpdateSuccessDiv.empty();
            photoUpdateSuccessDiv.append(`<p>Profile picture updated.</p>`);
            photoUpdateSuccessDiv.show();
        }
        catch (e){
            console.log(e);
            photoUpdateErrorDiv.append(`<p> Error uploading picture</p>`);
            photoUpdateErrorDiv.show();
        }
    });

    $(document).on('click', '.updateAccountBtn', async (e) => {
        //error checking
        errorDiv.hide();
        errorDivList.empty();
        updateSuccessDiv.hide();

        let errList = [];
        if(firstName.val().trim()==='') errList.push('First Name can not be blank');
        if(lastName.val().trim()==='') errList.push('Last Name can not be blank');
        if(!( /\d{1,2}\/\d{1,2}\/\d{4}$/).test(dateOfBirth.val().trim())) errList.push('Please enter date of birth in format ("MM/DD/YYYY)');
        if(!( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.val().trim()))) errList.push('Invalid Email format');
        if(street.val().trim()==='') errList.push('Street can not be blank');
        if(!(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode.val().trim())))  errList.push('Zipcode not in valid format');
        if(state.val().trim()==='') errList.push('State can not be blank');
        if(town.val().trim()==='') errList.push('Town can not be blank');

        let requestConfig = {
            method: "PATCH",
            url: `/users/${userid}`,
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
            })
        };
        if(errList.length > 0){
            for(let err of errList){
                errorDivList.append(`<li class='updateError'>${err}</li>`);
            }
            errorDiv.show();
        }
        else{
            let result;
            try{
                result = await $.ajax(requestConfig);
                errorDiv.hide();
                updateSuccessDiv.empty();
                updateSuccessDiv.append(`<p>Account successfully updated.</p>`);
                updateSuccessDiv.show();
            } 
            catch (e){
                errorDivList.empty();
                errorDivList.append(`<li class='updateError'>Error updating account: ${e.responseJSON.error}</li>`);
                errorDiv.show();
            }
        }
        

        return;
    });

    deleteButton.addEventListener('click', function(e) {
        e.preventDefault();
        let requestConfig = {
            method: "DELETE",
            url: `/users`,
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
