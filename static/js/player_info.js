$(document).ready(function() {

    $('#error_message').hide();
    $('#no_message').hide();

    $('#go_search').click(function(){
        if($('#search').val()){
        $.ajax({
            data : {
                name : $('#search').val(),
            },
            type : 'POST',
            url : '/search_player'
        })
        .done(function(data) {
            $("#search_data").empty();
            if(data.players == "not found"){
                $('#no_message').show().delay(4000).fadeOut();
            }else{
                $.each(data.players,function(index,value){
                    $('#search_data').append(
                        '<tr>\
                            <td>\
                                <div class="widget-26-job-emp-img">\
                                    <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="image" />\
                                </div>\
                            </td>\
                            <td>\
                                <div class="widget-26-job-title">\
                                    <p>Player Id</p>\
                                    <p class="m-0"><a href="#" class="employer-name">'+ value.pid +'</a></p>\
                                </div>\
                            </td>\
                            <td>\
                                <div class="widget-26-job-title">\
                                    <p>Player Name</p>\
                                    <a href="#">'+ value.fullName +'</a>\
                                </div>\
                            </td>\
                        </tr>'
                    );
                });
            }
        })
        .error(function(data) {
            $('#error_message').show().delay(4000).fadeOut();
        });
        }
    });
});


function getval(name) {
    $.ajax({
        data : {
            name : name.value,
        },
        type : 'POST',
        url : '/search_player'
    })
    .done(function(data) {
        $("#search_data").empty();
        if(data.players == "not found"){
            $('#no_message').show().delay(4000).fadeOut();
        }else{
            $.each(data.players,function(index,value){
                $('#search_data').append(
                    '<tr>\
                        <td>\
                            <div class="widget-26-job-emp-img">\
                                <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="image" />\
                            </div>\
                        </td>\
                        <td>\
                            <div class="widget-26-job-title">\
                                <p>Player Id</p>\
                                <p class="m-0"><a href="#" class="employer-name">'+ value.pid +'</a></p>\
                            </div>\
                        </td>\
                        <td>\
                            <div class="widget-26-job-title">\
                                <p>Player Name</p>\
                                <a href="#">'+ value.fullName +'</a>\
                            </div>\
                        </td>\
                    </tr>'
                );
            });
        }
    })
    .fail(function(data) {
        $('#error_message').show().delay(4000).fadeOut();
    });
};