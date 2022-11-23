$(document).ready(function() {

  const getOptions = function() {
    $.ajax({
      method: "GET",
      url: "/users" + window.location.pathname
    }).done((data) => {
      const poll = data.poll[0];
      $('.poll').append('<ol id = "sort"></ol>');
      data.poll.reverse().forEach(element => {
        $('#sort').append(`<li id = ${element.option}>${element.option}</li>`);
      });
      $('.poll').append(`<input name="email" type="email" id="vote-email" placeholder="name@example.com"><br>`);
      $('.poll').append(`<button id = "choice" type = "button">Submit your results!</button>`);
      $('#sort').sortable();

      $("#choice").on('click', () => {

        const voteEmail = $('#vote-email').val();
        if ((poll.email.includes(voteEmail) || poll.sent_email.includes(voteEmail)) && voteEmail) {
          const s = $('#sort').sortable('toArray');
          const sReverse = s.reverse();
          const obj = {};
          sReverse.forEach((element, index) => { //send to the ranking row in the polls table
            obj[element] = index;
          });
          $.ajax({
            method: "PUT",
            url: "/users" + window.location.pathname,
            data: obj
          });
          window.location.href = `/poll/${poll.url}/result`;
        } else {
          alert('You can not vote this poll. Enter correct email');
        }

      });

    });
  };

  getOptions();


});
