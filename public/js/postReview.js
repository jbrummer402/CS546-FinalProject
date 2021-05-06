jQuery(document).ready(function($) {

    // get review form by id
    let reviewForm = $('#review-form');
    let blankError = $('#blank-error');
    let invalidRating = $('#invalid-rating');

    // on submit event
    reviewForm.submit(function(event) {
        
        event.preventDefault();

        // still need to check inputs
        
        // ignore freelancer vs poster atm, only seems to be reference like one place
        //let reviewOf = $('input.typeBtn:checked', reviewForm).val();


        let ratingVal = $('input.rateBtn:checked', reviewForm).val();
        let reviewTxt = $('#review-text').val();

        if (!ratingVal || !reviewTxt || reviewTxt.trim().length === 0){
            invalidRating.hide();
            blankError.show();
            return;
        }

        let ratingNum = Number(ratingVal);
        // this shouldnt happen but just to be thorough
        if (!ratingNum || !Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5){
            blankError.hide();
            invalidRating.show();
            return;
        }

        blankError.hide();
        invalidRating.hide();

        // get reviewee name, uses p user-to-review
        let revieweeName = $('#user-to-review').text();

        // get reviewer name, uses link to profile
        let reviewerName = $('#to-profile').text();      
        

        // get revieweeId
        let requestConfig1 = {
            method: 'GET',
            url: '/users/username/' + revieweeName
        }
        
        // for later: check for ajax req success
        let revieweeId;
        $.ajax(requestConfig1).then(function(res){
            revieweeId = res._id;
            
            // get reviewer id
            let requestConfig2 = {
                method: 'GET',
                url: '/users/username/' + reviewerName
            }

            $.ajax(requestConfig2).then(function(res) {
                let reviewerId = res._id;

                //now post to reviews/new with relevant info

                // im going insane whats wrong with this request
                let requestConfig3 = {
					method: 'POST',
					url: '/reviews/new',
					contentType: 'application/json',
					data: JSON.stringify({
						reviewee: revieweeId,
						reviewer: reviewerId,
                        reviewDescription: reviewTxt,
                        rating: ratingNum
					})
				};

                console.log(requestConfig3.data);
                console.log(requestConfig3);

                $.ajax(requestConfig3).then(function(res) {
                    // check for success, if so, reload page but now with reviews?
                    // if not, show error message

                    if (res.reviewCreated){
                        console.log(res.review);
                    }
                });
            });
            
        });

    });


});