var app = app || {};

app.UserView = (function () {
    function showLoginPage(selector) {
        $.get('Templates/loginPage.html', function (temp) {
            $(selector).html(temp);
            $("#login").on('click', function () {
                var username = $("#username").val();
                var password = $("#password").val();

                $.sammy(function () {
                    this.trigger('login', {username: username, password: password});
                });
            })
        })
    }

    function showRegisterPage(selector) {
        $.get('Templates/registerPage.html', function (temp) {
            $(selector).html(temp);
            $("#register").on('click', function () {
                var username = $("#username").val();
                var password = $("#password").val();

                $.sammy(function () {
                    this.trigger('register', {username: username, password: password});
                });
            })
        })
    }

    return {
        load: function () {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage
            }
        }
    }
}());