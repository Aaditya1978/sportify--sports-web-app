$(document).ready(function() {

    $('#error_message').hide();
    $('#no_message').hide();
    $('#spinner-border').hide();
    $('#spinner-border-2').hide();

    $('#go_search').click(function(){
        if($('#search').val()){
        $('#spinner-border').show();
        $.ajax({
            data : {
                name : $('#search').val(),
            },
            type : 'POST',
            url : '/search_player',
            complete: function(){
                $('#spinner-border').hide();
            }
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
                                <p class="m-0"><p class="employer-name">'+ value.pid +'</p></p>\
                            </div>\
                        </td>\
                        <td>\
                            <div class="widget-26-job-title">\
                                <p>Player Name</p>\
                                <p>'+ value.fullName +'</p>\
                            </div>\
                        </td>\
                        <td>\
                            <div class="widget-26-job-title">\
                                <button class="get_info" id="'+value.pid+'">GET INFO</button>\
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
        }
    });
});

function getval(name) {
    $('#spinner-border').show();
    $.ajax({
        data : {
            name : name.value,
        },
        type : 'POST',
        url : '/search_player',
        complete: function(){
            $('#spinner-border').hide();
        }
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
                                <p class="m-0"><p class="employer-name">'+ value.pid +'</p></p>\
                            </div>\
                        </td>\
                        <td>\
                            <div class="widget-26-job-title">\
                                <p>Player Name</p>\
                                <p>'+ value.fullName +'</p>\
                            </div>\
                        </td>\
                        <td>\
                            <div class="widget-26-job-title">\
                                <button class="get_info" id="'+value.pid+'">GET INFO</button>\
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


$('#search_data').on('click', 'button', function() {
    $('html, body').animate({
        scrollTop: $(".mainfooter").offset().top
    }, 500);
    $('#spinner-border-2').show();
    $.ajax({
        data : {
            id : this.id,
        },
        type : 'POST',
        url : '/search_player_id',
        complete: function(){
            $('#spinner-border-2').hide();
        }
    })
    .done(function(data) {
            // console.log(data.data["batting"]["listA"].BF)
            $(".player-content").empty();
            $('.player-content').append(
                '<img src="../static/images/cancel.png" alt="close" class="player-close">\
                <img src="' + data.imageURL + '" alt="image" class="player-image">\
                <h1>'+data.fullName+'</h1>\
                <h5>'+data.playingRole+'</h5>\
                <h6>'+data.country+'</h6>\
                <hr>\
                <div class="data">\
                    <div class="inner-data">\
                        <div class="data-content">\
                            <p>Batting Style</p>\
                            <span>'+data.battingStyle+'</span>\
                        </div>\
                        <div class="data-content">\
                            <p>Bowling Style</p>\
                            <span>'+data.bowlingStyle+'</span>\
                        </div>\
                        <div class="data-content">\
                            <p>Current Age</p>\
                            <span>'+data.currentAge+'</span>\
                        </div>\
                    </div>\
                </div>\
                <div class="data">\
                    <div class="inner-data">\
                        <div class="data-content-2">\
                            <p>Born</p>\
                            <span>'+data.born+'</span>\
                        </div>\
                    </div>\
                    <div class="inner-data">\
                        <div class="data-content-2">\
                            <p>Major Teams</p>\
                            <span>'+data.majorTeams+'</span>\
                        </div>\
                    </div>\
                </div>\
                <hr>\
                '
            );
            try{
                data.data["batting"]["listA"]["50"]
                $('.player-content').append(
                    '<h2>Batting Record</h2>\
                    <br>\
                    <table>\
                    <thead>\
                        <tr>\
                            <th>&nbsp;</th>\
                            <th>50</th>\
                            <th>100</th>\
                            <th>St</th>\
                            <th>Ct</th>\
                            <th>6s</th>\
                            <th>4s</th>\
                            <th>SR</th>\
                            <th>BF</th>\
                            <th>Ave</th>\
                            <th>HS</th>\
                            <th>Runs</th>\
                            <th>NO</th>\
                            <th>Inns</th>\
                            <th>Mat</th>\
                        </tr>\
                    </thead>\
                    <tbody>\
                        <tr>\
                            <td>listA</td>\
                            <th>'+data.data["batting"]["listA"]["50"]+'</th>\
                            <th>'+data.data["batting"]["listA"]["100"]+'</th>\
                            <th>'+data.data["batting"]["listA"].St+'</th>\
                            <th>'+data.data["batting"]["listA"].Ct+'</th>\
                            <th>'+data.data["batting"]["listA"]["6s"]+'</th>\
                            <th>'+data.data["batting"]["listA"]["4s"]+'</th>\
                            <th>'+data.data["batting"]["listA"].SR+'</th>\
                            <th>'+data.data["batting"]["listA"].BF+'</th>\
                            <th>'+data.data["batting"]["listA"].Ave+'</th>\
                            <th>'+data.data["batting"]["listA"].HS+'</th>\
                            <th>'+data.data["batting"]["listA"].Runs+'</th>\
                            <th>'+data.data["batting"]["listA"].NO+'</th>\
                            <th>'+data.data["batting"]["listA"].Inns+'</th>\
                            <th>'+data.data["batting"]["listA"].Mat+'</th>\
                        </tr>\
                        <tr>\
                            <td>firstClass</td>\
                            <th>'+data.data["batting"]["firstClass"]["50"]+'</th>\
                            <th>'+data.data["batting"]["firstClass"]["100"]+'</th>\
                            <th>'+data.data["batting"]["firstClass"].St+'</th>\
                            <th>'+data.data["batting"]["firstClass"].Ct+'</th>\
                            <th>'+data.data["batting"]["firstClass"]["6s"]+'</th>\
                            <th>'+data.data["batting"]["firstClass"]["4s"]+'</th>\
                            <th>'+data.data["batting"]["firstClass"].SR+'</th>\
                            <th>'+data.data["batting"]["firstClass"].BF+'</th>\
                            <th>'+data.data["batting"]["firstClass"].Ave+'</th>\
                            <th>'+data.data["batting"]["firstClass"].HS+'</th>\
                            <th>'+data.data["batting"]["firstClass"].Runs+'</th>\
                            <th>'+data.data["batting"]["firstClass"].NO+'</th>\
                            <th>'+data.data["batting"]["firstClass"].Inns+'</th>\
                            <th>'+data.data["batting"]["firstClass"].Mat+'</th>\
                        </tr>\
                        <tr>\
                            <td>T20Is</td>\
                            <th>'+data.data["batting"]["T20Is"]["50"]+'</th>\
                            <th>'+data.data["batting"]["T20Is"]["100"]+'</th>\
                            <th>'+data.data["batting"]["T20Is"].St+'</th>\
                            <th>'+data.data["batting"]["T20Is"].Ct+'</th>\
                            <th>'+data.data["batting"]["T20Is"]["6s"]+'</th>\
                            <th>'+data.data["batting"]["T20Is"]["4s"]+'</th>\
                            <th>'+data.data["batting"]["T20Is"].SR+'</th>\
                            <th>'+data.data["batting"]["T20Is"].BF+'</th>\
                            <th>'+data.data["batting"]["T20Is"].Ave+'</th>\
                            <th>'+data.data["batting"]["T20Is"].HS+'</th>\
                            <th>'+data.data["batting"]["T20Is"].Runs+'</th>\
                            <th>'+data.data["batting"]["T20Is"].NO+'</th>\
                            <th>'+data.data["batting"]["T20Is"].Inns+'</th>\
                            <th>'+data.data["batting"]["T20Is"].Mat+'</th>\
                        </tr>\
                        <tr>\
                            <td>ODIs</td>\
                            <th>'+data.data["batting"]["ODIs"]["50"]+'</th>\
                            <th>'+data.data["batting"]["ODIs"]["100"]+'</th>\
                            <th>'+data.data["batting"]["ODIs"].St+'</th>\
                            <th>'+data.data["batting"]["ODIs"].Ct+'</th>\
                            <th>'+data.data["batting"]["ODIs"]["6s"]+'</th>\
                            <th>'+data.data["batting"]["ODIs"]["4s"]+'</th>\
                            <th>'+data.data["batting"]["ODIs"].SR+'</th>\
                            <th>'+data.data["batting"]["ODIs"].BF+'</th>\
                            <th>'+data.data["batting"]["ODIs"].Ave+'</th>\
                            <th>'+data.data["batting"]["ODIs"].HS+'</th>\
                            <th>'+data.data["batting"]["ODIs"].Runs+'</th>\
                            <th>'+data.data["batting"]["ODIs"].NO+'</th>\
                            <th>'+data.data["batting"]["ODIs"].Inns+'</th>\
                            <th>'+data.data["batting"]["ODIs"].Mat+'</th>\
                        </tr>\
                        <tr>\
                            <td>tests</td>\
                            <th>'+data.data["batting"]["tests"]["50"]+'</th>\
                            <th>'+data.data["batting"]["tests"]["100"]+'</th>\
                            <th>'+data.data["batting"]["tests"].St+'</th>\
                            <th>'+data.data["batting"]["tests"].Ct+'</th>\
                            <th>'+data.data["batting"]["tests"]["6s"]+'</th>\
                            <th>'+data.data["batting"]["tests"]["4s"]+'</th>\
                            <th>'+data.data["batting"]["tests"].SR+'</th>\
                            <th>'+data.data["batting"]["tests"].BF+'</th>\
                            <th>'+data.data["batting"]["tests"].Ave+'</th>\
                            <th>'+data.data["batting"]["tests"].HS+'</th>\
                            <th>'+data.data["batting"]["tests"].Runs+'</th>\
                            <th>'+data.data["batting"]["tests"].NO+'</th>\
                            <th>'+data.data["batting"]["tests"].Inns+'</th>\
                            <th>'+data.data["batting"]["tests"].Mat+'</th>\
                        </tr>\
                    </tbody>\
                </table>\
                <hr>\
                <h2>Bowling Record</h2>\
                <br>\
                <table>\
                    <thead>\
                        <tr>\
                            <th>&nbsp;</th>\
                            <th>10</th>\
                            <th>5w</th>\
                            <th>4w</th>\
                            <th>SR</th>\
                            <th>Econ</th>\
                            <th>Ave</th>\
                            <th>BBM</th>\
                            <th>BBI</th>\
                            <th>Wkts</th>\
                            <th>Runs</th>\
                            <th>Balls</th>\
                            <th>Inns</th>\
                            <th>Mat</th>\
                        </tr>\
                    </thead>\
                    <tbody>\
                        <tr>\
                            <td>listA</td>\
                            <th>'+data.data["bowling"]["listA"]["10"]+'</th>\
                            <th>'+data.data["bowling"]["listA"]["5w"]+'</th>\
                            <th>'+data.data["bowling"]["listA"]["4w"]+'</th>\
                            <th>'+data.data["bowling"]["listA"].SR+'</th>\
                            <th>'+data.data["bowling"]["listA"].Econ+'</th>\
                            <th>'+data.data["bowling"]["listA"].Ave+'</th>\
                            <th>'+data.data["bowling"]["listA"].BBM+'</th>\
                            <th>'+data.data["bowling"]["listA"].BBI+'</th>\
                            <th>'+data.data["bowling"]["listA"].Wkts+'</th>\
                            <th>'+data.data["bowling"]["listA"].Runs+'</th>\
                            <th>'+data.data["bowling"]["listA"].Balls+'</th>\
                            <th>'+data.data["bowling"]["listA"].Inns+'</th>\
                            <th>'+data.data["bowling"]["listA"].Mat+'</th>\
                        </tr>\
                        <tr>\
                            <td>firstClass</td>\
                            <th>'+data.data["bowling"]["firstClass"]["10"]+'</th>\
                            <th>'+data.data["bowling"]["firstClass"]["5w"]+'</th>\
                            <th>'+data.data["bowling"]["firstClass"]["4w"]+'</th>\
                            <th>'+data.data["bowling"]["firstClass"].SR+'</th>\
                            <th>'+data.data["bowling"]["firstClass"].Econ+'</th>\
                            <th>'+data.data["bowling"]["firstClass"].Ave+'</th>\
                            <th>'+data.data["bowling"]["firstClass"].BBM+'</th>\
                            <th>'+data.data["bowling"]["firstClass"].BBI+'</th>\
                            <th>'+data.data["bowling"]["firstClass"].Wkts+'</th>\
                            <th>'+data.data["bowling"]["firstClass"].Runs+'</th>\
                            <th>'+data.data["bowling"]["firstClass"].Balls+'</th>\
                            <th>'+data.data["bowling"]["firstClass"].Inns+'</th>\
                            <th>'+data.data["bowling"]["firstClass"].Mat+'</th>\
                        </tr>\
                        <tr>\
                            <td>T20Is</td>\
                            <th>'+data.data["bowling"]["T20Is"]["10"]+'</th>\
                            <th>'+data.data["bowling"]["T20Is"]["5w"]+'</th>\
                            <th>'+data.data["bowling"]["T20Is"]["4w"]+'</th>\
                            <th>'+data.data["bowling"]["T20Is"].SR+'</th>\
                            <th>'+data.data["bowling"]["T20Is"].Econ+'</th>\
                            <th>'+data.data["bowling"]["T20Is"].Ave+'</th>\
                            <th>'+data.data["bowling"]["T20Is"].BBM+'</th>\
                            <th>'+data.data["bowling"]["T20Is"].BBI+'</th>\
                            <th>'+data.data["bowling"]["T20Is"].Wkts+'</th>\
                            <th>'+data.data["bowling"]["T20Is"].Runs+'</th>\
                            <th>'+data.data["bowling"]["T20Is"].Balls+'</th>\
                            <th>'+data.data["bowling"]["T20Is"].Inns+'</th>\
                            <th>'+data.data["bowling"]["T20Is"].Mat+'</th>\
                        </tr>\
                        <tr>\
                            <td>ODIs</td>\
                            <th>'+data.data["bowling"]["ODIs"]["10"]+'</th>\
                            <th>'+data.data["bowling"]["ODIs"]["5w"]+'</th>\
                            <th>'+data.data["bowling"]["ODIs"]["4w"]+'</th>\
                            <th>'+data.data["bowling"]["ODIs"].SR+'</th>\
                            <th>'+data.data["bowling"]["ODIs"].Econ+'</th>\
                            <th>'+data.data["bowling"]["ODIs"].Ave+'</th>\
                            <th>'+data.data["bowling"]["ODIs"].BBM+'</th>\
                            <th>'+data.data["bowling"]["ODIs"].BBI+'</th>\
                            <th>'+data.data["bowling"]["ODIs"].Wkts+'</th>\
                            <th>'+data.data["bowling"]["ODIs"].Runs+'</th>\
                            <th>'+data.data["bowling"]["ODIs"].Balls+'</th>\
                            <th>'+data.data["bowling"]["ODIs"].Inns+'</th>\
                            <th>'+data.data["bowling"]["ODIs"].Mat+'</th>\
                        </tr>\
                        <tr>\
                            <td>tests</td>\
                            <th>'+data.data["bowling"]["tests"]["10"]+'</th>\
                            <th>'+data.data["bowling"]["tests"]["5w"]+'</th>\
                            <th>'+data.data["bowling"]["tests"]["4w"]+'</th>\
                            <th>'+data.data["bowling"]["tests"].SR+'</th>\
                            <th>'+data.data["bowling"]["tests"].Econ+'</th>\
                            <th>'+data.data["bowling"]["tests"].Ave+'</th>\
                            <th>'+data.data["bowling"]["tests"].BBM+'</th>\
                            <th>'+data.data["bowling"]["tests"].BBI+'</th>\
                            <th>'+data.data["bowling"]["tests"].Wkts+'</th>\
                            <th>'+data.data["bowling"]["tests"].Runs+'</th>\
                            <th>'+data.data["bowling"]["tests"].Balls+'</th>\
                            <th>'+data.data["bowling"]["tests"].Inns+'</th>\
                            <th>'+data.data["bowling"]["tests"].Mat+'</th>\
                        </tr>\
                    </tbody>\
                </table>'
                );
            }
            finally{
                document.querySelector(".player-popup").style.display = "flex";
                $('#spinner-border-2').hide();
                }

    })
    .fail(function(data) {
        $('#error_message').show().delay(4000).fadeOut();
    });
});

$('.player-content').on('click', '.player-close', function()
{
    document.querySelector(".player-popup").style.display = "none";
});

