jQuery(document).ready(function ($) {
  let allButtons = document.querySelectorAll(".deleteBtn");

  let updateButton = document.querySelectorAll(".editBtn");

  let editJobForms = document.getElementsByClassName("editJobForm");

  for (let i = 0; i < editJobForms.length; i++) {
    const element = editJobForms[i];
    element.setAttribute("id", `${i}`);
    $(`#${i}`).submit(function (event) {
      event.preventDefault();
      // get all the inputs into an array.
      var $inputs = $(`#${i} :input`);

      // not sure if you wanted this, but I thought I'd add it.
      // get an associative array of just the values.
      var values = {};
      $inputs.each(function () {
        if (this.name === "perHour") {
          values[this.name] = $(this).is(":checked");
        } else {
          values[this.name] = $(this).val();
        }
      });

      console.log(values);
      console.log($inputs);
      let requestConfig = {
        method: "PATCH",
        url: `/jobs/${values.jobID}`,
        contentType: "application/json",
        data: JSON.stringify({
          title: values.jobTitle,
          compensation: values.compensation,
          description: values.description,
          perHour: values.perHour,
        }),
      };
      $.ajax(requestConfig).then(function (responseMessage) {
        console.log(responseMessage);
        if (responseMessage.error) {
          console.log(responseMessage.error);
        } else {
          window.location.href = "/profile/activejobs";
        }
      });
    });
  }

  for (var i = 0; i < allButtons.length; i++) {
    let button = allButtons[i];
    let parent = button.parentElement;
    let hiddenInfo = parent.querySelector(".jobID");

    button.addEventListener("click", function () {
      let requestConfig = {
        method: "DELETE",
        url: `/../jobs/${hiddenInfo.value}`,
        contentType: "application/json",
      };
      console.log(hiddenInfo.value);
      $.ajax(requestConfig).then(function (responseMessage) {
        console.log(responseMessage);
        if (responseMessage.error) {
          console.log(responseMessage.error);
        } else {
          window.location.href = "/profile/activejobs";
        }
      });
    });
  }
  for (var i = 0; i < updateButton.length; i++) {
    let button = updateButton[i];
    let parent = button.parentElement;
    let hiddenInfo = parent.querySelector(".jobID");

    button.addEventListener("click", function () {
      console.log("test");
      let requestConfig = {
        method: "PATCH",
        url: `/jobs/${hiddenInfo.value}`,
        contentType: "application/json",
        // data : JSON.stringify({
        //     jobToUpdate : AuthCookie.id;
        // })
      };
      $.ajax(requestConfig).then(function (responseMessage) {
        console.log(responseMessage);
        if (responseMessage.error) {
          console.log(responseMessage.error);
        } else {
          window.location.href = "/profile/activejobs";
        }
      });
    });
  }
});
