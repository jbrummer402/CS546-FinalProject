jQuery(document).ready(function($){
    let claimButton = $('#claim-button');

    claimButton.on('click', function(event){
        // update jobsactive as employee and jobs active as employer for relevant parties
        // and set job status to in-progress
        event.preventDefault();

        let workerUname = $('#to-profile').text();
        let jobUrl = claimButton.attr("formaction");

        if (workerUname.length === 0){
            // error saying you must be logged in to claim
            return;
        }
        
        // need poster id and id of person claiming job
        // get poster url and update jobsInProgressAsEmployer
        let posterUrl = $('#to-poster-prof').attr("href");


        // get worker id
        let requestConfig = {
            method: 'GET',
            url: 'users/username/' + workerUname.trim()
        }
        $.ajax(requestConfig).then(function(res){
            let workerId = res._id;
            
            // update jobsInProgressAsEmployee 

        });

        // use jobUrl to update job status

        // then need to post so that can update job, need an update route tho
        // var requestConfig = {
        //     method: "POST",
        //     url: claimButton.attr("formaction"),
        //     contentType: "application/json",
        //     data: JSON.stringify({
            
        //     }),
        // };
        
    });
});