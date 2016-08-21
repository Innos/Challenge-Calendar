var app = app || {};

app.BookView = (function () {
    function showBooks(selector, data) {
        $.get('Templates/booksPage.html', function (temp) {
            var result = Mustache.render(temp, data);
            $(selector).html(result);

            $('.editContainer').hide();

            $('#addBook').on('click', function () {
                var title = $('#title').val(),
                    author = $('#author').val(),
                    isbn = $('#isbn').val();
                var input = $('#fileUpload')[0];
                var file = input.files[0];

                var pictureInfo = {_filename:file.name, size:file.size, mimeType:file.type};

                $.sammy(function () {
                    this.trigger('addBook', {title: title, author: author, isbn: isbn,picture:file,pictureInfo:pictureInfo})
                })
            });

            $('.editBook').on('click', function () {
                var editContainer = $(this).next();
                var isVisible = editContainer.is( ":visible" );
                if(isVisible){
                    editContainer.hide();
                }
                else{
                    editContainer.show();
                }

            });

            $('.edit').on('click', function () {
                var isbn = $(this).prev();
                var author = isbn.prev();
                var title = author.prev();
                var id = $(this).parent().parent().attr('data-id');
                var book = {};
                $.sammy(function () {
                    this.trigger('editBook', {id: id, title: title.val(), author: author.val(), isbn: isbn.val()})
                })
            });

            $('.deleteBook').on('click', function () {
                var element = $(this).parent();
                var id = element.attr('data-id');
                $.sammy(function () {
                    this.trigger('deleteBook', {id: id})
                })
            });

        })
    }

    return {
        load: function () {
            return {
                showBooks: showBooks
            }
        }
    }
})();
