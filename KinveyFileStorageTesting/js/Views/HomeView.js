var app = app || {};

app.HomeView = (function () {
    function showHomePage(selector) {
        $.get('Templates/home.html', function (template) {
            $(selector).html(template);

            $("#login").on('click',function(){
                $.sammy(function(){
                    this.trigger('redirectUrl',{url:'#/login'});
                })
            });

            $("#register").on('click',function(){
                $.sammy(function(){
                    this.trigger('redirectUrl',{url:'#/register'});
                })
            });
        });
    }

    function showHomePageLogged(selector,data) {
        $.get('Templates/homeLogged.html', function (template) {

            var result = Mustache.render(template, data);
            $(selector).html(result);

            $("#books").on('click',function(){
                $.sammy(function(){
                    this.trigger('redirectUrl',{url:'#/books'});
                })
            });

            $("#logout").on('click',function(){
                $.sammy(function(){
                    this.trigger('redirectUrl',{url:'#/logout'});
                })
            });
        });
    }

    return {
        load: function () {
            return {
                showHomePage: showHomePage,
                showHomePageLogged:showHomePageLogged
            }
        }
    }
})();