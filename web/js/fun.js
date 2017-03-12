

var audio;


function init() {

    initAudio($('#playList').find('li:first-child'));

}

function initAudio(element){
    var song = element.children()[2].attributes[1].value;
    var title = element.text();
    var cover = element.attr('cover');
    var artist = element.attr('artist');

    audio = new Audio("../media/"+song);


    if(!audio.currentTime){
        $('#progressTime').html('0:00');
    }

    $('#titulo').text(title);
    $('#artista').text(artist);
    $('#imgArtista').attr('src',cover);

    $('#playlist').find('li').removeClass('active');
    element.addClass('active');
}

function playM() {

    audio.play();
    $('#play').hide();
    $('#pause').show();
    $('#progreso').fadeIn(400);
    calcularProgreso();

}

function pauseM() {

    audio.pause();
    $('#play').show();
    $('#pause').hide();

}




function calcularProgreso(){
    $(audio).bind('timeupdate', function(){

        var seg = parseInt(audio.currentTime % 60);
        var min = parseInt((audio.currentTime / 60) % 60);

        if (seg < 10)  seg = '0' + seg;

        $('#progressTime').html(min + ':' + seg);

        var value = 0;

        if (audio.currentTime > 0) {
            value = Math.floor((10000 / audio.duration) * audio.currentTime);
        }

        $('#progreso').attr('value',value);
    });
}




function post0(servlet) {


    //var entrada = $("#").val();
    //var path = $("#").val();

    var data = {
        postfun: '',
        post: '',
        post: ''
    };

    $.post(servlet, data, function (response) {

        $('#mensj').html(response);

    });
}