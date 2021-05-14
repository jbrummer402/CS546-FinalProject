jQuery(document).ready(function($) {
    // check if logged in
    const currentUserID = $('#currentUser').attr('user');
    if(currentUserID.trim() != "" && currentUserID.trim() != 'none'){
        // logged in, check which reviews posted are made by this user
        // then append edit and delete buttons
        const reviewsList = $('#reviews-of-list');

        for(let review of reviewsList.children()){
            const reviewer = $(review).attr('reviewer');
            const reviewid = $(review).attr('reviewid');
            if(reviewer == currentUserID){
                $(review).append(`<button class="reviewEditButton" reviewid=${reviewid}>Edit Review</button>`);
                $(review).append(`<button class="reviewDeleteButton" reviewid=${reviewid}>Delete Review</button>`);
            }
        }

        $(document).on('click', '.reviewEditButton', async (e)=>{
            // create edit form on edit button click
            let reviewHtmlToEdit = $(e.currentTarget).parent();
            const reviewIdToEdit = $(reviewHtmlToEdit).attr('id');
            console.log(reviewIdToEdit);
            if($(`#reviewEditArea`).length){
                // remove old form if previously tried to edit another review
                $('#reviewEditArea').remove();
            }

            $(reviewHtmlToEdit).append(`<form id='reviewEditArea' class='reviewEditForm' reviewid=${reviewIdToEdit}>
                <label for="newReviewDescription">New Review Text:</label><br>
                <input type="text" id="newReviewDescription" name="newReviewDescription">
                <div id="newRating">
                <label for="newrate1">1</label>
                <input type="radio" name="newrateBtn" id="newrate1" value="1" />
                <label for="newrate2">2</label>
                <input type="radio" name="newrateBtn" id="newrate2" value="2" />
                <label for="newrate3">3</label>
                <input type="radio" name="newrateBtn" id="newrate3" value="3" />
                <label for="newrate4">4</label>
                <input type="radio" name="newrateBtn" id="newrate4" value="4" />
                <label for="newrate5">5</label>
                <input type="radio" name="newrateBtn" id="newrate5" value="5" /> </div>
                <button id='editSubmit' class='editSubmitBtn'>Submit edit</button>
                </form>`
                );
            
        });

        $(document).on('click', '.editSubmitBtn', async (e)=>{
            // after submit edit button
            e.preventDefault();
            let newRating;
            let newReviewDescription = $('#newReviewDescription').val();
            const reviewIdToEdit = $('#reviewEditArea').attr('reviewid');
            let reviewHtmlToEdit = $(`#${reviewIdToEdit}`);
            if(!reviewIdToEdit){
                alert('Error');
                return;
            }
            newReviewDescription = newReviewDescription.trim();
            newRating = $("input[name='newrateBtn']:checked").val();
            

            if(!newRating && !newReviewDescription){
                if($(`#reviewEditSuccessMsg`).length){
                    $('#reviewEditSuccessMsg').remove();
                }
                if($(`#editerror${reviewIdToEdit}`).length){
                    $(`#editerror${reviewIdToEdit}`).remove();
                }
                
                $(reviewHtmlToEdit).append(`<h3 id='editerror${reviewIdToEdit}' class='reviewEditErrorMsg'>Please enter a new rating and/or description.</h3>`);
                return;
            }
            let requestConfig  = {
                method: 'PATCH',
                url: `/reviews/${reviewIdToEdit}`,
                data: {
                    rating: newRating,
                    reviewDescription: newReviewDescription
                }
            };
            let result;
            try{
                result = await $.ajax(requestConfig);
            }
            catch (e){
                console.error(e);
                if(!$(`#editerror${reviewIdToEdit}`).length){
                    $(reviewHtmlToEdit).append(`<h3 id='editerror${reviewIdToEdit}' class='reviewEditErrorMsg'>Error editing review!</h3>`);
                }
                return;
            }
            $('#reviewEditArea').remove();
            // show new review info
            if(newRating) $(`#${reviewIdToEdit} .reviewRating`).html(`Rating: ${newRating}`);
            if(newReviewDescription) $(`#${reviewIdToEdit} .reviewDescription`).html(`${newReviewDescription}`);
            
            if($(`#reviewEditSuccessMsg`).length){
                $('#reviewEditSuccessMsg').remove();
            }
            if($(`#editerror${reviewIdToEdit}`).length){
                $(`#editerror${reviewIdToEdit}`).remove();
            }
            $(reviewHtmlToEdit).append(`<p id='reviewEditSuccessMsg' class='reviewEditSuccess'>Review updated.</p>`);
        });

        $(document).on('click', '.reviewDeleteButton', async (e)=>{
            let reviewHtmlToDelete = $(e.currentTarget).parent();
            let reviewIdToDelete = $(reviewHtmlToDelete).attr('id');
            if(confirm('Are you sure you want to delete this review?')){
                let requestConfig  = {
                    method: 'DELETE',
                    url: `/reviews/${reviewIdToDelete}`
                };
                let result;
                let reviewElement = $(e.currentTarget).parent();
                try{
                    result = await $.ajax(requestConfig);
                }
                catch(e){
                    console.error(e);
                    //error deleting
                    if(!$(`#del${reviewIdToDelete}`).length){
                        // ensure we only create a single error message if error happens more than once
                        $(reviewElement).append(`<h3 id='del${reviewIdToDelete}' class='reviewDeleteErrorMsg'>Error deleting review!</h3>`);
                    }
                    
                    return;
                }
                if(result && result.deleted == 'true'){
                    $(reviewElement).empty();
                    $(reviewElement).append(`<h3 class='reviewDeleteConfirmation'>Review deleted.</h3>`);
                }
                else{
                    // result came back from server, but error deleting on server side
                    if(!$(`#del${reviewIdToDelete}`).length){
                        // ensure we only create a single error message if error happens more than once
                        $(reviewElement).append(`<h3 id='del${reviewIdToDelete}' class='reviewDeleteErrorMsg'>Error deleting review!</h3>`);
                    }
                    return;
                }
            }
            else{
                return;
            }
        })
    }
});