$('#submit_addPost').on('click', function () {
    if (!($('#promiseCheck').is(':checked'))) return alert('Lütfen kuralları kabul edin!')
    let title = $('#postTitle').val()
    if (title === '') return alert('Lütfen ilan başlığını doldurun')
    let price = $('#postPrice').val()
    if (price === '') return alert('Lütfen ilan fiyatını doldurun')
    let description = $('#postDesc').val()
    if (description === '') return alert('Lütfen ilan açıklamasını doldurun')

    $.post('https://express-blog-project.herokuapp.com/addPost', {
        title: title,
        price: price,
        description: description,
    })
    .done(data => {
        console.log('success', data)
        Swal.fire({
            position: 'top-end',
            icon: data.isSuccess ? 'success' : 'error',
            title: data.message,
            showConfirmButton: false,
            timer: 1000
          })
          setTimeout(() => {
            location.href = 'https://express-blog-project.herokuapp.com/posts'
          }, 1000);
    })
    .fail(err => {
        console.log('error', err.responseJSON)
    })
})