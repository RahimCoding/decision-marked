// Client facing scripts here
$(document).ready(function() {
  $('#chart').hide;
  // poll page rendering
  const rendPoll = function() {
    $.ajax({
      method: "GET",
      url: "/users" + window.location.pathname
    }).done((table) => {
      const poll = table.poll;
      let sum = 0;
      poll.forEach(element => {
        sum += element.ranking;
      });
      //if poll just created show message
      if (sum === 0) {
        $('body').append('<h1 class = "created-header" >Thank you! Your poll is created.</h1>');
        $('body').append('<img src="http://localhost:8080/images/images.png" />');
        $('#chart').hide();
      } else {
        $(`<h2>${poll[0].question}</h2>`).insertBefore('#chart');
        let options = [];
        let rankings = [];
        for (const element of poll) {
          options.push(element.option);
        rankings.push(element.ranking);
      }
      //chart rendering
      const ctx = $('#chart');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: options,
          datasets: [{
            label: '# of Points',
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
    }
    });
  };

  rendPoll();
});
