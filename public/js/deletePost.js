function deletePost (id) {
    $.ajax({
        url: `https://express-blog-project.herokuapp.com/deletePost`,
        dataType: 'json',
        type: 'delete',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                id
            }
        ),
        processData: false,
        success: function (data, textStatus, jQxhr) {
            console.log('success', data)
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
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown)
        }
    })
}