$(document).ready(function() {

    $("#success_message").hide();
    $("#error_message").hide();

    $('#subscribe').click(function(){
        $.ajax({
            type : 'GET',
            url : '/subscribe',
        })
        .done(function(data) {
            if(data=="success")
            $('#success_message').show().delay(4000).fadeOut();
            else
            $('#error_message').show().delay(4000).fadeOut();

        })
    });
});