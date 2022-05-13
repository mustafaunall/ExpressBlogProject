function updatePost (id) {
    $.ajax({
        url: `http://localhost:3000/postDetailUpdate`,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                id, title: $('#upt_title').val(), description: $('#upt_description').val(), price: $('#upt_price').val()
            }
        ),
        processData: false,
        success: function (data, textStatus, jQxhr) {
            let {_id, title, description, price} = data.detail
            $('#upt_title').val(title); $('#upt_description').val(description); $('#upt_price').val(price); $('#upt_id').val(_id);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown)
        }
    })
}

$('#postUpdateButton').on('click', function() {
    $.ajax({
        url: `http://localhost:3000/updatePost`,
        dataType: 'json',
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                id: $('#upt_id').val(),
                title: $('#upt_title').val(),
                description: $('#upt_description').val(),
                price: $('#upt_price').val()
            }
        ),
        processData: false,
        success: function (data, textStatus, jQxhr) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1000
              })
            setTimeout(function() {
                location.reload()
            }, 1000)
        },
        error: function (jqXhr, textStatus, errorThrown) {
            Swal.fire({
                position: 'top-end',
                icon: data.isSuccess ? 'success' : 'error',
                title: data.message,
                showConfirmButton: false,
                timer: 1000
              })
              setTimeout(() => {
                location.reload()
              }, 1000);
        }
    })
})