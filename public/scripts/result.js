// Client facing scripts here
$(document).ready(function() {
  $('#chart').hide;
  function rendPoll() {
    $.ajax({
      method: "GET",
      url: "/users" + window.location.pathname
    }).done((table) => {
      const sum = table.ranks.reduce((accumulator, currentvalue) =>
        accumulator + currentvalue, 0);
      if (!sum) {
        $('body').append('<h1>Thank you! Your poll is created.</h1>');
        $('#chart').hide();
      }
      const ctx = $('#chart');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: table.options,
          datasets: [{
            label: '# of Votes',
            data: table.ranks,
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

