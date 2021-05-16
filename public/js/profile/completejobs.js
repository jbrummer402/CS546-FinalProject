jQuery(document).ready(function($){
    let toEmployee = $('.to-employee');
    let toEmployer = $('.to-employer');

    toEmployee.on('click', function(event){
        let toUrl = toEmployee.attr("name");
        location.replace(toUrl);
    });

    toEmployer.on('click', function(event){
        let toUrl = toEmployer.attr("name");
        location.replace(toUrl);
    });

});