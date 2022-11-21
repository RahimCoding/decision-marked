$(document).ready(function () {


  function getOptions() {
  $.ajax({
    method: "GET",
    url: "/users" + window.location.pathname
  }).done((data) => {
    $('.poll').append('<ul id = "sort"></ul>');
    data.options.forEach((element, index) => {
      $('#sort').append(`<li id = ${index}>${element}</li>`)
    });
    $('.poll').append(`<button id = "choice" type = "button">ttt345345</button>`)
    $('#sort').sortable();

    $("#choice").on('click', () =>  {
      const s = $('#sort').sortable('toArray')
      console.log(s);
    });
  });
}

getOptions();


});
