$(document).ready(function () {

    $(".deleteLaunch").click((e) => {
        e.preventDefault()
        var id = $(e.target).data("id")
        myFunction(id)
    })

    function myFunction(id) {
        var txt;
        var r = confirm("Press a button!");
        if (r == true) {
            ajaxDelete(id)
        } else {
            return null
        }
    }

    function ajaxDelete(id) {
        $.ajax({
            url: `/api/launch/delete/${id}`,
            type: 'DELETE',
            data: {
                req: 'values'
            },
            success: function (
                data) {
                $(`#${data.id}`)
                    .remove()
            },
            error: function (
                e) {
                alert('loi')
            }
        });
    }
});