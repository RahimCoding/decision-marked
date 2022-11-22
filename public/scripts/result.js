// Client facing scripts here
$(document).ready(function () {
  $('#chart').hide;
  const rendPoll = function() {
    $.ajax({
      method: "GET",
      url: "/users" + window.location.pathname
    }).done((table) => {
      const poll = table.poll;
      console.log("poll2", poll);
      const sum = poll.reduce((accumulator, currentvalue) =>
        accumulator + currentvalue, 0);
      console.log(sum);
      if (!sum) {
        $('body').append('<h1>Thank you! Your poll is created.</h1>');
        $('#chart').hide();
      }
      let options = [];
      let rankings = [];
      for (const element of poll) {
        options.push(element.option);
        rankings.push(element.ranking);
      }
      const ctx = $('#chart');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: options,
          datasets: [{
            label: '# of Votes',
            data: rankings,
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
  };

  rendPoll();
});

