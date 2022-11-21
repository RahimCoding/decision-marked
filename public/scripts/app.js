// Client facing scripts here
$(document).ready(function () {
  let i = 2;

  const poll = {
    id: 'sedrg4b',
    email: 'tbekishev@gmail.com',
    question: 'What movie are we watching this Friday?',
    options: ['Matrix 7', 'Interstellar 3', 'Die Hard 10'],
    receivers: ['rahimj2196@gmail.com'],
    ranks: [1,4,2]
    }
  const buttonOption = function () {
    i++;
    let $optionString = $(`<input class="form-control">`)
      .attr('name', 'option' + i)
      .attr('type', 'text')
      .attr('id', 'exampleFormControlInput' + i)
      .attr('placeholder' ,'option ' + i);
    $("#options").append($optionString);
  };

  $("#button").click(function (event) {
    event.stopPropagation();
    buttonOption();
  });
});



