// Client facing scripts here
$(document).ready(function () {

  let i = 2;

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



