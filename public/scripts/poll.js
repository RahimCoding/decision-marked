$(document).ready(function () {


  const getOptions = function() {
    $.ajax({
      method: "GET",
      url: "/users" + window.location.pathname
    }).done((data) => {
      const poll = data.poll[0];
      $('.poll').append('<ul id = "sort"></ul>');
      console.log(poll.option);
      poll.option.forEach((element, index) => {
        $('#sort').append(`<li id = ${element}>${element}</li>`);
      });
      $('.poll').append(`<button id = "choice" type = "button">Submit your results!</button>`);
      $('#sort').sortable();

      $("#choice").on('click', () => {
        const s = $('#sort').sortable('toArray');
        const sReverse = s.reverse();
        sReverse.forEach((element, index) => { //send to the ranking row in the polls table
          poll.ranking[parseInt(element)] += index;
        });
        console.log(sReverse);
        let obj = Object.assign({}, sReverse);
        console.log(obj);
      });
    });
  };

  getOptions();


});
