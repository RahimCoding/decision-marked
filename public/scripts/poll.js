$(document).ready(function () {


  const getOptions = function() {
    console.log("/users" , window.location.pathname);
    $.ajax({
      method: "GET",
      url: "/users" + window.location.pathname
    }).done((data) => {
      const poll = data.poll[0];
      console.log("poll", data);
      $('.poll').append('<ol id = "sort"></ol>');
      console.log(poll.option);
      data.poll.reverse().forEach((element, index) => {
        $('#sort').append(`<li id = ${element.option}>${element.option}</li>`);
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
        console.log("poll[o]:",poll.url);
        let obj = Object.assign({}, sReverse);
        console.log("obj:",obj);
        $.ajax({
          method: "PUT",
          url: "/users" + window.location.pathname,
          data: obj
        });
        window.location.href = `/poll/${poll.url}/result`;
      });

    });
  };

  getOptions();


});
