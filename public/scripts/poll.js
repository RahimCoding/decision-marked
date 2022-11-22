$(document).ready(function () {


  function getOptions() {
  $.ajax({
    method: "GET",
    url: "/users" + window.location.pathname
  }).done((data) => {
    const poll = data.poll[0];
    $('.poll').append('<ul id = "sort"></ul>');
    poll.option.forEach((element, index) => {
      $('#sort').append(`<li id = ${index}>${element}</li>`)
    });
    $('.poll').append(`<button id = "choice" type = "button">ttt345345</button>`)
    $('#sort').sortable();

    $("#choice").on('click', () =>  {
      const s = $('#sort').sortable('toArray')
      const sReverse = s.reverse();
      sReverse.forEach((element, index) => {
        poll.ranking[parseInt(element)] += index;
      });
      console.log(sReverse)
    });
  });
}

getOptions();


});
