jQuery(document).ready(function ($) {
    let allButtons = document.querySelectorAll('.deleteBtn');

    for (var i = 0; i < allButtons.length; i++) {
        let button = allButtons[i];
        let parent = button.parentElement;
        let hiddenInfo = parent.querySelector('.jobID');

        button.addEventListener('click', function() {
            let requestConfig = {
                method: "DELETE",
                url: `/../jobs/${hiddenInfo.value}`,
                contentType: "application/json",
            };
            $.ajax(requestConfig).then(function (responseMessage) {
                console.log(responseMessage)
                if (responseMessage.error) {
                    console.log(responseMessage.error)
                } else {
                    window.location.href = "/profile/activejobs";
                }
            });
        });
    }
});

