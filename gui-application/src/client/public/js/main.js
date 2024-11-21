const api = 'http://localhost:3000';

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
        showEquipment();
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
        url: `${api}/auth/login`,
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
            console.log(err);
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
        url: `${api}/auth/register`,
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
            console.log(err);
            showToast(err.responseJSON.message, 'error');
        }
    });

});

function showEquipment(keyword) {
    $.ajax({
        method: "GET",
        url: `${api}/equipment${keyword ? `?keyword=${encodeURIComponent(keyword)}` : ''}`,
        dataType: "json",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get('token')
        },
        success: function (res) {
            const template = convertPlaceHbs($('#table-equipment-template').html());
            const compiled = Handlebars.compile(template);
            const html = compiled({ equipments: res.data });
            $('#table-equipment tbody').html(html);
        },
        error: function (err) {
            console.log(err);
            showToast(err.responseJSON.message, 'error');
        }
    });
}

$('#input-search').on('input', _.debounce(function () {
    const keyword = $(this).val().trim();
    showEquipment(keyword);
}, 200));

function loadEquipmentCategory() {
    $.ajax({
        method: "GET",
        url: `${api}/equipment-category`,
        headers: { 'Authorization': 'Bearer ' + Cookies.get('token') },
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            const template = convertPlaceHbs($('#select-equipment-category-template').html());
            const compiled = Handlebars.compile(template);
            const html = compiled({ equipmentCategories: res.data });
            $('#select-equipment-category').html(html);
        },
        error: function (err) {
            console.log(err);
            showToast(err.responseJSON.message, 'error');
        }
    });
} loadEquipmentCategory();

function loadDepartment() {
    $.ajax({
        method: "GET",
        url: `${api}/department`,
        headers: { 'Authorization': 'Bearer ' + Cookies.get('token') },
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            const template = convertPlaceHbs($('#select-department-template').html());
            const compiled = Handlebars.compile(template);
            const html = compiled({ departments: res.data });
            $('#select-department').html(html);
        },
        error: function (err) {
            console.log(err);
            showToast(err.responseJSON.message, 'error');
        }
    });
} loadDepartment();

$('#btn-equipment-create').click(function () {
    const data = {
        name: $('#input-equipment-name').val().trim(),
        description: $('#input-equipment-description').val().trim(),
        categoryId: $('#select-equipment-category').val(),
        departmentId: $('#select-department').val(),
        status: $('#select-equipment-status').val(),
        condition: $('#select-equipment-condition').val(),
        isActive: true
    };

    $.ajax({
        method: "POST",
        url: `${api}/equipment/create`,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'Authorization': 'Bearer ' + Cookies.get('token') },
        success: function () {
            $('#input-equipment-name').val('');
            $('#input-equipment-description').val('');
            $('#select-equipment-category').val('');
            $('#select-department').val('');
            $('#select-equipment-status').val('');
            $('#select-equipment-condition').val('');
            showToast('create equipment successfully', 'success');
            modal_equipment_create.close();
        },
        error: function (err) {
            console.log(err);
            showToast(err.responseJSON.message, 'error');
        }
    });
});