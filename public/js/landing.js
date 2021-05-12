jQuery(document).ready(function($){
    let landingList = $('#landing-list');
    let searchForm = $('#search-form');
    let blankSearch = $('#blank-search');

    blankSearch.hide();

    // clear list
    landingList.empty();


    function bindJobListLink(jobItem){
        let LI = ('</li>')
            .text("hello")
            .appendTo(landingList);
        let LI = ('</li>')
            .appendTo(landingList);
        // each job item has title
        let title = $('</h3>')
            .text(jobItem.title)
            .appendTo(LI);
        // datePosted
        let date = $('</h4>')
            .text(jobItem.datePosted)
            .appendTo(LI);
        // compensation + type
        let type = '';
        if (jobItem.perHour){
            type = 'per Hour';
        }
        let comp = $('</h4>')
            .text("Compensation:" + jobItem.compensation + type)
            .appendTo(LI);
        // address.town
        let loc = $('</h4>')
            .text("Location: " + jobItem.address.town)
            .appendTo(LI);
        // show description on click
        let descBtn = $('</input>')
            .text("Description")
            .attr("type", "button")
            .attr("id", jobItem._id.toString())
            .appendTo(LI);
        let descLbl = $('</label>')
            .text("Description Button")
            .appendTo(LI)
            .hide();
        let descTxt = $('</p>')
            .text(jobItem.description)
            .appendTo(LI)
            .hide();
        // toggle on click whether description is shown
        descBtn.on('click', function(event){
            descBtn.toggle();
        });
        
    }

    // on page load, populate with list of recent jobs
    // need to check this works when jobs backend get finished
    let requestConfig = {
        method: 'GET',
        url: '/jobs'
    }
    // i dont think .then is executing but im not sure if thats bc theres no result atm
    $.ajax(requestConfig).then(function(res){
        $.each(res, function(curJob) {
            bindJobListLink(res[curJob]);
        });
        landingList.show();
    });


    // when search is entered, make ajax call?
    searchForm.submit(function(event){
        event.preventDefault();

        let searchType = $('input[name="search-type"]:checked', searchForm).val();
        let searchText = $('input[name="search"', searchForm).val();

        // check all input is accounted for
        if (!searchType || !searchText || searchText.trim().length === 0){
            blankSearch.show();
            return;
        }


        // make calls to appropriate routes for searches
        // need routes or smth

        
    })

});