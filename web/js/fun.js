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