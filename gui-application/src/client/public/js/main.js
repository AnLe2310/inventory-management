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
            $('#select-equipment-category-update').html(html);
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
            $('#select-department-update').html(html);
            $('#equipment-report_departmentId').html(html);
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

function updateEquipment(id) {
    $.ajax({
        method: "GET",
        url: `${api}/equipment/${id}`,
        headers: { 'Authorization': 'Bearer ' + Cookies.get('token') },
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            $('#input-equipment-id-update').val(res.data[0]._id);
            $('#input-equipment-name-update').val(res.data[0].name);
            $('#input-equipment-description-update').val(res.data[0].description);
            $('#select-equipment-category-update').val(res.data[0].category[0]._id);
            $('#select-department-update').val(res.data[0].department[0]._id);
            $('#select-equipment-status-update').val(res.data[0].status);
            $('#select-equipment-condition-update').val(res.data[0].condition);
            modal_equipment_update.showModal();
        },
        error: function (err) {
            console.log(err);
            showToast(err.responseJSON.message, 'error');
        }
    });
}

$('#btn-equipment-update').click(function () {
    const data = {
        id: $('#input-equipment-id-update').val().trim(),
        name: $('#input-equipment-name-update').val().trim(),
        description: $('#input-equipment-description-update').val().trim(),
        categoryId: $('#select-equipment-category-update').val(),
        departmentId: $('#select-department-update').val(),
        status: $('#select-equipment-status-update').val(),
        condition: $('#select-equipment-condition-update').val(),
        isActive: true
    };

    $.ajax({
        method: "PATCH",
        url: `${api}/equipment/update`,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        headers: { 'Authorization': 'Bearer ' + Cookies.get('token') },
        success: function (res) {
            showToast("Update equipment successfully", 'success');
        },
        error: function (err) {
            console.log(err);
            showToast(err.responseJSON.message, 'error');
        }
    });
});

function reportEquipment(id) {
    $('#equipment-report_equipmentId').val(id);
    modal_equipment_report.showModal();
}

$('#btn-equipment-report_create').click(function () {
    const data = {
        equipmentId: $('#equipment-report_equipmentId').val().trim(),
        userId: $('#equipment-report_userId').val().trim() || '67355face20f610c21fb52f8',
        departmentId: $('#equipment-report_departmentId').val(),
        title: $('#equipment-report_title').val().trim(),
        description: $('#equipment-report_description').val(),
        status: 'Pending',
        isActive: true
    };

    $.ajax({
        method: "POST",
        url: `${api}/equipment-report/create`,
        data: JSON.stringify(data),
        headers: { 'Authorization': 'Bearer ' + Cookies.get('token') },
        dataType: 'json',
        contentType: "application/json",
        success: function (res) {
            console.log(res);
            showToast("Create Report successfully", 'success');
            $('#equipment-report_equipmentId').val('');
            $('#equipment-report_userId').val('');
            $('#equipment-report_title').val('');
            $('#equipment-report_description').val('');
            modal_equipment_report.close();
        },
        error: function (err) {
            console.log(err);
            showToast(err.responseJSON.message, 'error');
        }
    });
});