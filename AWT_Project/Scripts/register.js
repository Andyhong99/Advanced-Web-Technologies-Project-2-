///<reference path ="jquery-3.3.1.js"/>
$(document).ready(function () {
    registerNamespace.initialize();
});

(function () {
    this.registerNamespace = this.registerNamespace || {};
    var ns = this.registerNamespace;
    var currentrecord;
    ns.initialize = function () {
        $('#btnsave').on('click', ns.save);
        ns.display();
    };
    function retrievefromstorage() {
        var registerJSON = localStorage.getItem('register');
        return registerJSON ? JSON.parse(registerJSON) : [];

    }
})();
ns.display = function () {
    var results = retrievefromstorage();
    bindToGrid(results);
    $('#currentAction').html('Add User');
    currentrecord = { key: null, register: {} };
    displayCurrentRecord();
    var results = retrievefromstorage();
    bindToGrid(results);
};
function bindToGrid(results) {
    var html = '';
    for (var i = 0; i < results.length; i++) {
        var contact = results[i];
        html += '<tr><td>' + register.Email + '</td>';
        html += '<td>' + register.FirstName + '' + register.LastName + '<td>';
        html += '<td><a class="edit" href="javascript:void(0)" data-key=' + i + '>Edit</a></td></tr>';

    }
    html = html || '<tr><td colspan="3"> No Records available</td></tr>';
    $('#register tbody').html(html);
    $('#register a.edit').on('click', ns.loadregister);
}

ns.loadregister = function () {
    var key = parseInt($(this).attr('data-key'));
    var results = retrievefromstorage;
    $('#currentAction').html('Edit Registeration');
    currentrecord = { key: key, register: results[key] }
    displayCurrentRecord();
};

function displayCurrentRecord() {
    var register = currentrecord.register;
    $('#FirstName').val(register.FirstName);
    $('#LastName').val(register.LastName);
    $('#Email').val(register.Email);

}
ns.save = function () {
    var register = currentrecord.register;
    register.FirstName = $('#FirstName').val();
    register.LastName = $('#LastName').val();
    register.Email = $('#Email').val();

    var results = retrievefromstorage();
    if (currentrecord.key != null) {
        results[currentrecord.key] = register;
    }
    else {
        results.push(register);
    }
    localStorage.setItem('register', JSON.stringify(results));
    ns.display();
};
