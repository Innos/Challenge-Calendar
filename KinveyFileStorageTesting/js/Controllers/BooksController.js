var app = app || {};

app.BookController = (function () {
        function BookController(model, viewbag) {
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
                        result.books.push(new BookOutput(book._id, book.title, book.author, book.isbn, book.imgUrl));
                    });

                    _this._viewbag.showBooks(selector, result);
                }).done();
        };

        BookController.prototype.addBook = function (data) {
            var _this = this;

            var picture = data.picture;
            var pictureInfo = data.pictureInfo;
            this._model.upload(picture,pictureInfo,{public:true})
                .then(function (uploadInfo) {
                    var id = uploadInfo._id;
                    _this._model.streamPicture(id)
                        .then(function (returnInfo) {
                            var downloadUrl = returnInfo._downloadURL;
                            var book = new BookInput(data.title, data.author, data.isbn, downloadUrl);
                            _this._model.create(book)
                                .then(function (success) {
                                    $.sammy(function () {
                                        this.trigger('redirectUrl', {url: "#/books"});
                                    })
                                })
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

    }
    ()
)
;