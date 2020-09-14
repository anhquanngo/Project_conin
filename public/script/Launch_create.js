$('textarea').val('');
//date
$('#min-date').bootstrapMaterialDatePicker({
    format: 'YYYY/MM/DD HH:mm:ss',
    minDate: new Date()
});
$('#max-date').bootstrapMaterialDatePicker({
    format: 'YYYY/MM/DD HH:mm:ss',
    minDate: new Date()
});

document.addEventListener("DOMContentLoaded", function () {
    var elements = document.getElementsByTagName("INPUT");
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function (e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                e.target.setCustomValidity("This field cannot be left blank");
            }
        };
        elements[i].oninput = function (e) {
            e.target.setCustomValidity("");
        };
    }
})

$("#form-add-post").submit(function () {
    let file = $("#logo").val();
    if (file != "") {
        alert(check());
    } else {
        alert("Please field post ");
    }
});

function check() {
    var temp = $('#logo');
    var f1 = temp.get(0).files[0];
    if (f1.size > 5000000) {
        $('#error-message').html('Error - File size is too large, please try again less than 5MB');
        $('.box-error').removeClass('hidden');
        setTimeout(function () {
            $('.box-error').addClass('hidden');
        }, 5000);
        event.preventDefault();
        return 'Error , please check again';
    }
    return 'Create new success';
}