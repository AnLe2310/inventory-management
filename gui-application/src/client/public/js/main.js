$('#btn-tab-sign-in').click(function () {
    $('#tab-sign-in').removeClass('hidden');
    $('#tab-sign-up').addClass('hidden');
    $(this).addClass('tab-active');
    $('#btn-tab-sign-up').removeClass('tab-active');
});

$('#btn-tab-sign-up').click(function () {
    $('#tab-sign-up').removeClass('hidden');
    $('#tab-sign-in').addClass('hidden');
    $(this).addClass('tab-active');
    $('#btn-tab-sign-in').removeClass('tab-active');
});

$('#btn-sign-in').click(function () {
    const data = {
        username: "admin",
        password: "123"
    };
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/auth/login",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
        },
        error: function (err) {
            console.log(err);
        }
    });
});