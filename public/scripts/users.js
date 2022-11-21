// Client facing scripts here
$(document).ready(function() {

  function rendPoll() {
      $.ajax({
        method: "GET",
        url: "/users" + window.location.pathname
      }).done((table) => {
          $('h1').hide();
          $('body').append(`<h2>${table.url_id}</h2>`)
          $('body').append(`<h2>${table.email}</h2>`)
          $('body').append(`<h2>${table.question}</h2>`)
          $('body').append(`<h2>${table.options}</h2>`)
          $('body').append(`<h2>${table.receivers}</h2>`)
          console.log(window.location.pathname)
          console.log(table)
      });
  }

  rendPoll();
});

