var app = app || {};

(function(){
    app.router = $.sammy(function(){
        var baseUrl = "https://baas.kinvey.com";
        var appId = "kid_Zyidw1NtyZ";
        var appSecret = "38488c4017e6499d8982a2a6f6335d7d";
        var selector = "#wrapper";

        var requester = app.requester.load();

        var credentials = app.credentials.load(appId,appSecret);
        var userModel = app.user.load(baseUrl,appId,credentials,requester);
        var bookModel = app.book.load(baseUrl,appId,credentials,requester);

        //var data = app.data.load(baseUrl,requester,appId,appSecret);

        var homeView = app.HomeView.load();
        var userView = app.UserView.load();
        var bookView = app.BookView.load();

        var homeController = app.HomeController.load(userModel,homeView);
        var userController = app.UserController.load(userModel,userView,credentials);
        var bookController = app.BookController.load(bookModel,bookView);

        this.before({except: {path: '#\/(register|login)?'}},function(){
            var sessionId = sessionStorage.getItem('sessionId');
            if(!sessionId){
                this.redirect("#/login");
                return false;
            }
        });

        this.get('#/', function(){
            homeController.loadHomePage(selector);
        });

        this.get('#/login', function(){
            userController.loadLoginPage(selector);
        });

        this.get('#/logout', function(){
            userController.logout();
        });

        this.get('#/books', function(){
            bookController.loadBooksPage(selector);
        });

        this.get('#/register', function(){
            userController.loadRegisterPage(selector);
        });

        this.get('#/home', function(){
            homeController.loadHomePageLogged(selector);
        });

        this.bind('redirectUrl', function(e,data){
            this.redirect(data.url);
        });

        this.bind('login', function(e,data){
            userController.login(data);
        });

        this.bind('register', function(e,data){
            userController.register(data);
        });

        this.bind('deleteBook', function (e, data) {
            bookController.deleteBook(data);
        });

        this.bind('addBook', function (e, data) {
            bookController.addBook(data);
        });

        this.bind('editBook', function (e, data) {
            bookController.updateBook(data);
        });

        this.bind('uploadPicture', function (e, data) {
            bookController.uploadPicture(data);
        });
    });

    app.router.run('#/')
}());