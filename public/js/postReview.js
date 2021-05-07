jQuery(document).ready(function($) {

    // get review form by id
    let reviewForm = $('#review-form');
    let blankError = $('#blank-error');
    let invalidRating = $('#invalid-rating');
    let addError = $('#add-error');
    let ownError = $('#own-error');

    // on submit event
    reviewForm.submit(function(event) {
        
        event.preventDefault();
        
        // ignore freelancer vs poster atm, only seems to be reference like one place
        //let reviewOf = $('input.typeBtn:checked', reviewForm).val();


        let ratingVal = $('input[name="rateBtn"]:checked', reviewForm).val();
        let reviewTxt = $('#review-text').val();

        if (!ratingVal || !reviewTxt || reviewTxt.trim().length === 0){
            invalidRating.hide();
            addError.hide();
            ownError.hide();
            blankError.show();
            return;
        }

        let ratingNum = Number(ratingVal);
        
        // this shouldnt happen but just to be thorough
        if (!ratingNum || !Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5){
            blankError.hide();
            addError.hide();
            ownError.hide();
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
                let reviewerFullName = res.firstName + ' ' + res.lastName;
                // check here whether reviewer and reviewee have same id
                // if so do not continue
                if (revieweeId === reviewerId){
                    // show error message
                    ownError.show();
                    return;
                }
                ownError.hide();

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
                        rating: ratingNum
					})
				};


                $.ajax(requestConfig3).then(function(res) {
                    // check for success, if so, reload page
                    // if not, show error message
                   
                    if (res.reviewCreated){
                        addError.hide();
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