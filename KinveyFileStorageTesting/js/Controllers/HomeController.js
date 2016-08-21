var app = app|| {};

app.HomeController = (function (){
    function HomeController(model,viewbag){
        this._model = model;
        this._viewbag = viewbag;
    }

    HomeController.prototype.loadHomePage = function(selector){
        this._viewbag.showHomePage(selector);
    };

    HomeController.prototype.loadHomePageLogged = function(selector){
        var user = this._model.getCurrentUser();
        this._viewbag.showHomePageLogged(selector,user);
    };

    return {
        load: function(model,viewbag){
            return new HomeController(model,viewbag);
        }
    }
}());