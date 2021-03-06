jQuery(document).ready(function($){
    let claimButton = $('#claim-button');
    let claimed = $('#job-claimed-alt');
    let posterError = $('#posterErr');
    let loggedError = $('#logErr');
    let claimError = $('#claim-error');

    claimed.hide();
    claimError.hide();


    // returns array without given jobid
    function removeByMatch(id, array){
        let newArr = [];
        for (let i = 0; i < array.length; i++){
            if (array[i] === id){
                continue;
            }
            newArr.push(array[i]);
        }
        return newArr;
    }

    claimButton.on('click', function(event){
        // update jobsactive as employee and jobs active as employer for relevant parties
        // and set job status to in-progress
        event.preventDefault();

        let workerUname = $('#to-profile').text();
        let posterUname = $('#to-poster-prof').text();
        let jobId = $('.job-page-title').attr("id");
        let jobUrl = claimButton.attr("name");

        if (workerUname.length === 0){
            // error saying you must be logged in to claim
            posterError.hide();
            claimError.hide();

            loggedError.show();
            return;
        }
        console.log("claim clicked");
        // usernames are unique, so this is ok
        if (workerUname.trim() === posterUname.trim()){
            // error saying you may not claim a job that you posted
            loggedError.hide();
            claimError.hide();

            posterError.show();
            return;
        }
        
        // get poster
        let posterRequest = {
            method: 'GET',
            url: '/users/username/' + posterUname.trim(),
            error: function(){
                loggedError.hide();
                posterError.hide();

                claimError.show();
                return;
            }
        }

        $.ajax(posterRequest).then(function(res){
            // grab relevant fields to be updated
            let posterId = res._id;
            let posterActive = res.jobsActive;
            let posterInProgress = res.jobsInProgressAsEmployer;
            
            let posterActiveNew = removeByMatch(jobId, posterActive);
            
            posterInProgress.push(jobId);
            
            // make post request to update user, need to put what happens on an error
            let posterUpdate = {
                method: 'PATCH',
                url: '/users/' + posterId,
                contentType: 'application/json',
                data: JSON.stringify({
                    jobsActive: posterActiveNew,
                    jobsInProgressAsEmployer: posterInProgress
                }),
                error: function(){
                    // do something
                    
                    loggedError.hide();
                    posterError.hide();

                    claimError.show();
                    return;
                }
            }

            $.ajax(posterUpdate).then(function(res){
                
                // get worker 
                let workerRequest = {
                    method: 'GET',
                    url: '/users/username/' + workerUname.trim(),
                    error: function(){
                        
                        loggedError.hide();
                        posterError.hide();

                        claimError.show();
                        return;
                    }
                }
                $.ajax(workerRequest).then(function(res){
                    let workerId = res._id;
                    let workerInProgress = res.jobsInProgressAsEmployee;

                    workerInProgress.push(jobId);

                    // update jobsInProgressAsEmployee, need to have error functionality
                    let workerUpdate = {
                        method: 'PATCH',
                        url: '/users/' + workerId,
                        contentType: 'application/json',
                        data: JSON.stringify({
                            jobsInProgressAsEmployee: workerInProgress
                        }),
                        error: function(){
                            // do something
                           
                            loggedError.hide();
                            posterError.hide();

                            claimError.show();
                            return;
                        }
                    }
                    
                    $.ajax(workerUpdate).then(function(res){
                        // use jobUrl to update job status
                        // once job status is updated, hide claim job button and show in progress, or just reload page

                        //then need to post so that can update job, need an update route tho
                        var requestConfig = {
                            method: "PATCH",
                            url: claimButton.attr("name"),
                            contentType: "application/json",
                            data: JSON.stringify({
                                status: 'in-progress',
                                employeeId: workerId
                            }),
                            error: function(a, b, c){
                                // parser error syntax error unexpected end of json inpu
                                loggedError.hide();
                                posterError.hide();

                                claimError.show();
                                return;
                            }
                        }

                        $.ajax(requestConfig).then(function(res){
                            console.log("in here");
                            location.reload();
                        });
                    });

                });
            });

        })
        
    });
});