jQuery(document).ready(function($){
    let landingJobList = $('#landing-job-list');
    let landingUserList = $('#landing-user-list');
    let jobHeader = $('#job-header');
    let userHeader = $('#user-header');
    let searchForm = $('#search-form');
    let blankSearch = $('#blank-search');

    // just in case
    blankSearch.hide();
    jobHeader.hide();
    landingJobList.hide();
    userHeader.hide();
    landingUserList.hide();

    // clear list
    landingJobList.empty();
    landingUserList.empty();


    function bindJobListLink(jobItem){
        let LI = $('<li/>')
            .appendTo(landingJobList);
        // each job item has title
        let title = $('<h3/>')
            .text(jobItem.title)
            .appendTo(LI);
        // datePosted
        let date = $('<h4/>')
            .text(jobItem.datePosted)
            .appendTo(LI);
        // compensation + type
        let type = '';
        if (jobItem.perHour){
            type = ' per Hour';
        }
        let comp = $('<h4/>')
            .text("Compensation: " + jobItem.compensation + type)
            .appendTo(LI);
        // address.town
        let loc = $('<h4/>')
            .text("Location: " + jobItem.address.town)
            .appendTo(LI);
        // show description on click
        let descBtn = $('<input/>')
            .text("Description")
            .attr("type", "button")
            .attr("id", jobItem._id.toString())
            .appendTo(LI);
        let descLbl = $('<label/>')
            .text("Description Button")
            .appendTo(LI)
            .hide();
        let descTxt = $('<p/>')
            .text(jobItem.description)
            .appendTo(LI)
            .hide();
        // toggle on click whether description is shown
        descBtn.on('click', function(event){
            descBtn.toggle();
        });
        
    }

    function bindUserLink(userItem){
        let LI = $('<li/>')
            .appendTo(landingUserList);
        let h3 = $('<h3/>')
            .text(`${userItem.firstName} ${userItem.lastName}`)
            .appendTo(LI);
        let A = $('<a/>')
            .text(userItem.username)
            .attr("href", `/users/${userItem._id}`)
            .appendTo(LI);

        // no prevent default for link click, go to that user's page
    }

    // on page load, populate with list of recent jobs
    // need to check this works when jobs backend get finished
    let requestConfig = {
        method: 'GET',
        url: '/jobs'
    }
    // i dont think .then is executing but im not sure if thats bc theres no result atm
    // only show first 20 results
    $.ajax(requestConfig).then(function(res){
        $.each(res, function(curJob) {
            if (curJob >= 20){
                return false;
            }
            bindJobListLink(res[curJob]);
        });
        userHeader.hide();
        landingUserList.hide();

        jobHeader.show();
        landingJobList.show();
    });


    // when search is entered, make ajax call?
    searchForm.submit(function(event){
        event.preventDefault();

        landingJobList.empty();
        landingUserList.empty();

        let searchType = $('input[name="search-type"]:checked', searchForm).val();
        let searchText = $('#search-bar', searchForm).val();

        // check all input is accounted for
        if (!searchType || !searchText || searchText.trim().length === 0){
            blankSearch.show();
            return;
        }


        // make calls to appropriate routes for searches
        // need routes or smth
        // if its a search of users, make call to user search
        if (searchType === 'Users'){
            let requestConfig = {
                method: 'GET',
                url: '/users/search/' + searchText.trim()
            }
            $.ajax(requestConfig).then(function(res){
                $.each(res, function(curUser){
                    bindUserLink(res[curUser]);
                });
                jobHeader.hide();
                landingJobList.hide();

                userHeader.show();
                landingUserList.show();
            });
        }


    });

});