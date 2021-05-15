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
    let errorDiv = $('#error');
    errorDiv.hide();
    let errorDivList = $('#errorList');
    let successDiv = $('#successDiv');
    let value = jobperHour.prop('checked')

    updateNewJobForm.submit(function (event) {
        event.preventDefault();
        let errList = [];
        errorDiv.hide();
        errorDivList.empty();

        if(jobTitle.val().trim()==='') errList.push('Job Title can not be blank');
        if(jobDescription.val().trim()==='') errList.push('Job Description can not be blank');
        let jobComp = jobCompensation.val().trim();
        if(jobComp === '') errList.push('Job Compensation value is required');
        if(parseInt(jobComp) <= 0) errList.push('Job Compensation must be a positive number');
        if(street.val().trim()==='') errList.push('Street can not be blank');   
        if(!(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode.val().trim())))  errList.push('Zipcode not in valid format');
        if(state.val().trim()==='') errList.push('State can not be blank');
        if(town.val().trim()==='') errList.push('Town can not be blank');

        let requestConfig = {
            method: "POST",
            url: updateNewJobForm.attr("action"),
            contentType: "application/json",
            data: JSON.stringify({
                title: jobTitle.val(),
                description: jobDescription.val(),
                compensation: jobCompensation.val(),
                perHour: jobperHour.prop('checked'),
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
        if(errList.length > 0){
            for(let err of errList){
                errorDivList.append(`<li class='updateError'>${err}</li>`);
            }
            errorDiv.show();
        }
        else{
            $.ajax(requestConfig).then(function (responseMessage) {
                console.log(responseMessage)
                if (responseMessage.error) {
                    errorDiv.show();
                    errorDiv.empty();
                    errorDiv.append(`Error creating job from server: ${responseMessage.error}`);
                } else {
                    successDiv.show();
                    successDiv.empty();
                    successDiv.append('Job posted succesfully!');
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
        }
        
    });
});