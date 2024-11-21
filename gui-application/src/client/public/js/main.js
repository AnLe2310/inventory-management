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

function checkLogin() {
    const token = Cookies.get('token');

    if (token) {
        $('#btn-login').hide();
        $('#btn-logout').show();
    } else {
        $('#btn-login').show();
        $('#btn-logout').hide();
    }
} checkLogin();

$('#btn-logout').click(function () {
    Cookies.remove('token');
    checkLogin();
});

$('#btn-sign-in').click(function () {
    const data = {
        username: $('#input-login-username').val().trim(),
        password: $('#input-login-password').val().trim()
    };

    if (!data.username && !data.password)
        return showToast('Username and password are required', 'error');

    $.ajax({
        method: "POST",
        url: "http://localhost:3000/auth/login",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            Cookies.set('token', res.data.refresh_token);
            modal_login.close();
            $('#input-login-username').val('');
            $('#input-login-password').val('');
            checkLogin();
        },
        error: function (err) {
            console.log(err)
            showToast(err.responseJSON.message, 'error');
        }
    });
});

$('#btn-sign-up').click(function () {
    const data = {
        username: $('#input-register-username').val().trim(),
        email: $('#input-register-email').val().trim(),
        password: $('#input-register-password').val().trim(),
        confirm_password: $('#input-register-confirm-password').val().trim()
    };

    if (!data.username || !data.email || !data.password || !data.confirm_password)
        return showToast('All fields are required', 'error');

    if (data.password !== data.confirm_password)
        return showToast('Password and confirm password do not match', 'error');

    $.ajax({
        method: "POST",
        url: "http://localhost:3000/auth/register",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function () {
            $('#input-register-username').val('');
            $('#input-register-email').val('');
            $('#input-register-password').val('');
            $('#input-register-confirm-password').val('');
            showToast('register successfully, please check your email to activate your account', 'success');
        },
        error: function (err) {
            console.log(err)
            showToast(err.responseJSON.message, 'error');
        }
    });

});

