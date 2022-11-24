// Client facing scripts here
$(document).ready(function() {

  let i = 2;

  const buttonOption = function() {
    i++;
    let $optionString = $(`<input class="form-control">`)
      .attr('name', 'option' + i)
      .attr('type', 'text')
      .attr('id', 'option-input' + i)
      .attr('placeholder', 'option ' + i);
    $("#options").append($optionString);
  };

//----------------- Event listeners -----------------//

  $("#home").click(function() {
    window.location = "/";
  });


  $("#button").click(function(event) {
    event.stopPropagation();
    buttonOption();
  });

  $("#form-create-poll").submit(function(event) {
    event.preventDefault();
    const email = $('#email-input').val();
    const question = $('#question-input').val();
    const options = $('#options');
    const externalEmail = $('#email-input-external').val();
    const numbOfOptions = options.children().length;
    const optionsArray = [];
    let arrayOfErrors = [];
    for (let i = 0; i < numbOfOptions; i++) {
      if (options.children()[i].value !== '') {
        optionsArray.push(options.children()[i].value);
      }
    }
    if (!email) {
      arrayOfErrors.push("No email present");
    }
    if (!question) {
      arrayOfErrors.push("No questions present");
    }
    if (optionsArray.length < 2) {
      arrayOfErrors.push("please choose at least 2 options");
    }
    if (!externalEmail) {
      arrayOfErrors.push("Please choose someone to send too!");
    }
    if (arrayOfErrors.length > 0) {
      if (arrayOfErrors.length > 1) {
        const lastElement = arrayOfErrors[arrayOfErrors.length - 1];
        arrayOfErrors.splice(-1);
        $(".error-header").css("visibility", "visible");
        $(".error-header").text(arrayOfErrors.join(" , ") + " and " + lastElement);
      } else {
        $(".error-header").css("visibility", "visible");
        $(".error-header").text(arrayOfErrors.join(""));
      }
      return;
    }
    const formData = {
      email,
      question,
      options: optionsArray,
      receivers: externalEmail
    };

    $.ajax({
      type: "POST",
      url: "users/poll",
      data: formData,
      dataType: "json",
      encode: true,
      success: function(data) {
        console.log(data);
      }
    }).done(function(data) {
      window.location.href = `http://localhost:8080${data.url}`;
    });


  });

});



