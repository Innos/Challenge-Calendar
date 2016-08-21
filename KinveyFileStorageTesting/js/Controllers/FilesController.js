var app = app || {};

app.FilesController = (function () {
    function FilesController(model, viewbag) {
        this._model = model;
        this._viewbag = viewbag;
    }

    BookController.prototype.loadBooksPage = function (selector) {
        var _this = this;

        this._model.getAll()
            .then(function (success) {
                var result = {
                    books: []
                };

                success.forEach(function (book) {
                    result.books.push(new BookOutput(book._id, book.title, book.author, book.isbn));
                });

                _this._viewbag.showBooks(selector, result);
            }).done();
    };

    BookController.prototype.addBook = function (data) {
        var _this = this;

        var selector = data.selector;
        var book = new BookInput(data.title, data.author, data.isbn);
        this._model.create(book)
            .then(function (success) {
                $.sammy(function () {
                    this.trigger('redirectUrl', {url: "#/books"});
                })
            })
    };

    BookController.prototype.updateBook = function (data) {
        var _this = this;

        var selector = data.selector;
        var id = data.id;
        var book = new BookInput(data.title, data.author, data.isbn);
        this._model.update(id, book)
            .then(function (success) {
                $.sammy(function () {
                    this.trigger('redirectUrl', {url: "#/books"});
                })
            })
    };

    BookController.prototype.deleteBook = function (data) {
        var _this = this;

        var selector = data.selector;
        var id = data.id;
        this._model.deleteBook(id)
            .then(function (success) {
                $.sammy(function () {
                    this.trigger('redirectUrl', {url: "#/books"});
                })
            })
    };

    return {
        load: function (model, viewbag) {
            return new BookController(model, viewbag);
        }
    }

}());