// Client facing scripts here
$(document).ready(function () {
  let count = 2;
  const buttonOption = function () {
    count++;
    let $optionString = $(`<input class="form-control">`)
      .attr('id', 'exampleFormControlInput' + count)
      .attr('name', 'option' + count)
      .attr('type', 'text')
      .attr('placeholder' ,'option ' + count);
    $("#options").append($optionString);
  };
  $("#button").click(function (event) {
    event.stopPropagation();
    buttonOption();
  });

}
);



