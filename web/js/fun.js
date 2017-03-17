

var audio;
var volume = 0.1;
var repeat = false;

function init() {

    initAudio($('#playList').find('li:first-child'));

}

function initAudio(element){
    var song = element.children()[2].attributes[1].value;
    var title = element.children()[2].innerHTML;
    var artist = element.children()[3].innerHTML;
    var cover = element.attr('cover');


    audio = new Audio("../media/"+song);


    if(!audio.currentTime){
        $('#progressTime').html('0:00');
    }

    $('#titulo').text(title);
    $('#artista').text(artist);
    $('#imgArtista').attr('src',cover);

    $('#playList').find('li').removeClass('active');
    element.addClass('active');

    audio.volume = volume;

    var seg = parseInt(audio.currentTime % 60);
    var min = parseInt((audio.currentTime / 60) % 60);

    if (seg < 10)  seg = '0' + seg;
    $('#duracion').html(min + ':' + seg);

    audio.addEventListener('ended',siguiente);

}

function playM() {

    audio.play();
    audio.currentTime = audio.duration - 3;
    //$('audio').addEventListener('ended', siguiente());
    $('#play').hide();
    $('#pause').show();
    $('#barraProgreso').fadeIn(400);
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
        var segT = parseInt(audio.currentTime % 60);
        var minT = parseInt((audio.currentTime / 60) % 60);

        if (seg < 10)  seg = '0' + seg;
        $('#progressTime').html(min + ':' + seg);

        var value = 0;

        //2000 viene del atributo max de la barra de progreso en HTML
        //Menos de 2000 hace que la barra pegue algún salto brusco
        if (audio.currentTime > 0) {
            value = Math.floor((2000 / audio.duration) * audio.currentTime);
        }

        $('#barraProgreso').attr('value',value);
    });
}


var volu = document.getElementById('volumen');

/*
$('#volumen').addEventListener('click', function (e) {

    var x = e.pageX - this.offsetLeft;
    var volumen = x * this.max / this.offsetWidth;

    audio.volume = parseFloat(volumen / 100);
    $('#volumen').attr('value',volumen);
    alert(volumen);

});
*/

function volumenOnOff() {

    var volumenIco = $('#volumenIco');
    var volumenClass = volumenIco.findClass("fa-volume-up");

    if (volumenIco.className == "fa-volume-up"){
        volumenIco.removeClass("fa-volume-up");
        volumenIco.addClass("fa-volume-off");
        audio.volume = 0;
    } else{
        volumenIco.removeClass("fa-volume-off");
        volumenIco.addClass("fa-volume-up");
        audio.volume=volume;
    }

}

function siguiente() {

    audio.pause();
    var next = $('#playlist li.active').next();
    if ((next.length == 0) && (repeat)){
        next = $('#playlist li:first-child');
    }
    initAudio(next);
    audio.play();
    calcularProgreso();
}


function anterior() {

    audio.pause();
    var prev = $('#playlist li.active').prev();
    if ((prev.length == 0) && (repeat)) prev = $('#playlist li:last-child');
    else if ((prev.length == 0)) {
        stop();
        return;
    }
    initAudio(prev);
    audio.play();
    calcularProgreso();
}


function stop(){
    audio.pause();
    audio.currentTime = 0;
    $('#pause').hide();
    $('#play').show();
    $('#barraProgreso').fadeOut(400);
}

function repetir() {
    repeat =! repeat;

    if (repeat) $('#repetir').addClass('botonActivo');
    else $('#repetir').removeClass('botonActivo');

}


//Diseño e UI

function pintarPLay(element) {
    var xxx = element.firstChild;
}

function ocultarPlay(element) {
    //element.firstChild.hide();
}


function actualizarImagenArtista() {

    $('#imgArtista').attr()

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