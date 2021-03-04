var duration = 5000,
    interval = 7000,
    xhrPending = false,
    intervalTimer;

intervalTimer = setInterval(function() {
    if (xhrPending) return;
    $.ajax({
        data : {
            matchId : $('.ground_name').attr("id"),
            seriesId : $('.series_name').attr("id")
        },
        type : 'POST',
        url : '/match_live_ajax',
    }).done(function(data) {
        xhrPending = false;
        $('#team1_score').text(data.match.teams[0].score)
        $('#team2_score').text(data.match.teams[1].score)
        $('#bater1').text(data.content.livePerformance.batsmen[0].player.longName + " *")
        $('#run1').text(data.content.livePerformance.batsmen[0].runs)
        $('#ball1').text(data.content.livePerformance.batsmen[0].balls)
        $('#four1').text(data.content.livePerformance.batsmen[0].fours)
        $('#six1').text(data.content.livePerformance.batsmen[0].sixes)
        $('#sr1').text(data.content.livePerformance.batsmen[0].strikerate)
        if(data.content.livePerformance.batsmen[1]){
        $('#bater2').text(data.content.livePerformance.batsmen[1].player.longName)
        $('#run2').text(data.content.livePerformance.batsmen[1].runs)
        $('#ball2').text(data.content.livePerformance.batsmen[1].balls)
        $('#four2').text(data.content.livePerformance.batsmen[1].fours)
        $('#six2').text(data.content.livePerformance.batsmen[1].sixes)
        $('#sr2').text(data.content.livePerformance.batsmen[1].strikerate)}
        $('#bowler1').text(data.content.livePerformance.bowlers[0].player.longName)
        $('#over1').text(data.content.livePerformance.bowlers[0].overs)
        var runs1 = 0;
        $.each(data.content.livePerformance.bowlers[0].lhbPitchMap, function(key,value) {
            runs1 += value.runs;
        });
        $.each(data.content.livePerformance.bowlers[0].rhbPitchMap, function(key,value) {
            runs1 += value.runs;
        });
        $('#brun1').text(runs1)
        $('#maid1').text(data.content.livePerformance.bowlers[0].maidens)
        $('#wic1').text(data.content.livePerformance.bowlers[0].wickets)
        $('#eco1').text(data.content.livePerformance.bowlers[0].economy)
        $('#bowler2').text(data.content.livePerformance.bowlers[1].player.longName)
        $('#over2').text(data.content.livePerformance.bowlers[1].overs)
        var runs2 = 0;
        $.each(data.content.livePerformance.bowlers[1].lhbPitchMap, function(key,value) {
            runs2 += value.runs;
        });
        $.each(data.content.livePerformance.bowlers[1].rhbPitchMap, function(key,value) {
            runs2 += value.runs;
        });
        $('#brun2').text(runs2)
        $('#maid2').text(data.content.livePerformance.bowlers[1].maidens)
        $('#wic2').text(data.content.livePerformance.bowlers[1].wickets)
        $('#eco2').text(data.content.livePerformance.bowlers[1].economy)
    });

    xhrPending = true;
}, interval);

// setTimeout(function() {
//     clearInterval(intervalTimer);
// }, duration);