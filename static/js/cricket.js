$(document).ready(function() {
    $('.details').click(function(){
        $.ajax({
            data : {
                matchid : $(this).attr('id'),
                seriesid : $(this).attr('value'),
            },
            type : 'POST',
            url : '/cricket_score'
        })
        .done(function(data) {
            console.log(data)
        });
        event.preventDefault();
    });
});
