jQuery(document).ready(function($) {

    // get review form by id
    let reviewForm = $('#review-form');
    let blankError = $('#blank-error');
    let invalidRating = $('#invalid-rating');
    let addError = $('#add-error');
    let ownError = $('#own-error');
    let noAuth = $('#no-auth');
    let workedError = $('#notworked');
    let providedError = $('#notprovided');
    let noRevs = $('#no-rev');

    // on submit event
    reviewForm.submit(function(event) {
        
        event.preventDefault();

        blankError.hide();
        addError.hide();
        ownError.hide();
        noAuth.hide();
        workedError.hide();
        providedError.hide();
        noRevs.hide();
        invalidRating.hide();
        
        // ignore freelancer vs poster atm, only seems to be reference like one place
        //let reviewOf = $('input.typeBtn:checked', reviewForm).val();


        let ratingVal = $('input[name="rateBtn"]:checked', reviewForm).val();
        let reviewTxt = $('#review-text').val();
        let jobSelection = $('#job-select').val();

        if (!ratingVal || !jobSelection || !reviewTxt || reviewTxt.trim().length === 0 || jobSelection.trim() == ""){
            invalidRating.hide();
            addError.hide();
            ownError.hide();
            noAuth.hide();
            workedError.hide();
            providedError.hide();
            noRevs.hide();

            blankError.show();
            return;
        }

        // check type of reviewtxt input? Is that necessary?

        let ratingNum = Number(ratingVal);
        
        // this shouldnt happen but just to be thorough
        if (!ratingNum || !Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5){
            blankError.hide();
            addError.hide();
            ownError.hide();
            noAuth.hide();
            workedError.hide();
            providedError.hide();
            noRevs.hide();

            invalidRating.show();
            return;
        }

        blankError.hide();
        invalidRating.hide();

        // get reviewee name, uses p user-to-review
        let revieweeName = $('#user-to-review').text();

        // get reviewer name, uses link to profile
        let reviewerName = $('#to-profile').text();  
        
        // person not logged in
        if (reviewerName.length === 0){
            noAuth.show();
            return;
        }
        

        // get revieweeId
        let requestConfig1 = {
            method: 'GET',
            url: '/users/username/' + revieweeName,
            error: function() {
                blankError.hide();
                addError.hide();
                ownError.hide();
                noAuth.hide();
                workedError.hide();
                providedError.hide();
                invalidRating.hide();

                noRevs.show();
                return;
            }
        }
        
        // for later: check for ajax req success
        let revieweeId;
        $.ajax(requestConfig1).then(function(res){
            revieweeId = res._id;
            
            // get reviewer id
            let requestConfig2 = {
                method: 'GET',
                url: '/users/username/' + reviewerName,
                error: function(){
                    blankError.hide();
                    addError.hide();
                    ownError.hide();
                    noAuth.hide();
                    workedError.hide();
                    providedError.hide();
                    invalidRating.hide();

                    noRevs.show();
                    return;
                }
            }

            $.ajax(requestConfig2).then(function(res) {
                let reviewerId = res._id;
                let reviewerFullName = res.firstName + ' ' + res.lastName;
                // check here whether reviewer and reviewee have same id
                // if so do not continue
                if (revieweeId === reviewerId){
                    noRevs.hide();
                    addError.hide();
                    // show error message
                    ownError.show();
                    return;
                }

                ownError.hide();
                noAuth.hide();

                let revieweeJobType = $('#job-select option:selected').attr('title');

                if (revieweeJobType === 'Employee'){
                    if (!res.jobsProvided.includes(jobSelection)){
                        // error must have provided job
                        workedError.hide();
                        addError.hide();
                        noRevs.hide();

                        providedError.show();
                        return;
                    }
                } else if (revieweeJobType === 'Employer'){
                    if (!res.jobsWorked.includes(jobSelection)){
                        // error must have worked job
                        providedError.hide();
                        addError.hide();
                        noRevs.hide();

                        workedError.show();
                        return;
                    }
                }

                workedError.hide();
                providedError.hide();

                //now post to reviews/new with relevant info
                let requestConfig3 = {
					method: 'POST',
					url: '/reviews/new',
					contentType: 'application/json',
                    dataType: 'json',
					data: JSON.stringify({
						reviewee: revieweeId,
						reviewer: reviewerId,
                        reviewDescription: reviewTxt,
                        rating: ratingNum,
                        job: jobSelection
					}),
                    error: function(){
                        blankError.hide();
                        ownError.hide();
                        noAuth.hide();
                        workedError.hide();
                        providedError.hide();
                        invalidRating.hide();
                        noRevs.hide();

                        addError.show();
                        return;
                    }
				};


                $.ajax(requestConfig3).then(function(res) {
                    // check for success, if so, reload page
                    // if not, show error message
                   
                    if (res.reviewCreated){
                        addError.hide();
                        noRevs.hide();

                        location.reload();
                        // was try to add element dynamically as stopgap but 
                        // i think thats unnecessary, leaving this for now tho
                        // let myList = $('#reviews-of-list');
                        // let LI = $('</li>')
                        //     .appendTo(myList);
                        // let title = $('</h3>')
                        //     .text("Review By " + reviewerFullName)
                        //     .appendTo(LI);
                        // let date = $('</h4>')
                        //     .text(res.review.dateOfReview)
                        //     .appendTo(LI);
                        // let rating = $('</h4>')
                        //     .text("Rating: " + res.review.rating)
                        //     .appendTo(LI);
                        // let reviewHeader = $('</h4>')
                        //     .text("Review:")
                        //     .appendTo(LI);
                        // let reviewDes = $('</p>')
                        //     .text(res.review.reviewDescription)
                        //     .appendTo(LI);
                        // console.log(myList);
                        // console.log("uhh")
                    } else {
                        // show message saying error creating review
                        addError.show();
                    }
                });
            });
            
        });

    });


});