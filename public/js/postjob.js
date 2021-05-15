jQuery(document).ready(function ($) {
    let updateNewJobForm = $("#newJobForm");
    let jobTitle = $("#jobTitle");
    let jobDescription = $("#jobDescription");
    let jobCompensation = $("#jobCompensation");
    let jobperHour = $("#jobperHour");
    let street = $("#street");
    let aptNo = $("#aptNo");
    let zipCode = $("#zipCode");
    let state = $("#state");
    let town = $("#town");
    let country = $("#country");
    let error = $("#error");

    updateNewJobForm.submit(function (event) {
        event.preventDefault();
        // guys remember to error check the input data
        let requestConfig = {
            method: "POST",
            url: updateNewJobForm.attr("action"),
            contentType: "application/json",
            data: JSON.stringify({
                title: jobTitle.val(),
                description: jobDescription.val(),
                compensation: jobCompensation.val(),
                perHour: false,
                datePosted: new Date(),
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
            console.log(responseMessage)
            if (responseMessage.error) {
                error.show();
                error.empty();
                error.append(responseMessage.error);
            } else {
                error.show();
                error.empty();
                error.append('Job posted succesfully!');
                jobTitle.val('');
                jobDescription.val('');
                jobTitle.val('');
                jobCompensation.val('');
                jobperHour.val('');
                street.val('');
                aptNo.val('');
                zipCode.val('');
                state.val('');
                town.val('');
            }
        });
    });
});