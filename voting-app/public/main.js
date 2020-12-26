const dontToggle = ['INPUT', 'OPTION', 'SELECT']

$(".poll-wrap").click(function(e) {
  if(!dontToggle.includes(e.target.tagName)) {
    $(this).children().last().slideToggle("slow");
  }
});

$('select').change(function () {
    if ($(this).val() === 'Add option') {
      $(this).next().prop('disabled', false);
  } else {
    $(this).next().prop('disabled', true);
    }
});
