// Client facing scripts here
$(document).ready(function() {
  $('#chart').hide;
  function rendPoll() {
    $.ajax({
      method: "GET",
      url: "/users" + window.location.pathname
    }).done((table) => {
      const poll = table.poll[0];
      const sum = poll.ranking.reduce((accumulator, currentvalue) =>
        accumulator + currentvalue, 0);
        console.log(sum)
      if (!sum) {
        $('body').append('<h1>Thank you! Your poll is created.</h1>');
        $('#chart').hide();
      }
      const ctx = $('#chart');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: poll.option,
          datasets: [{
            label: '# of Votes',
            data: poll.ranking,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  rendPoll();
});

