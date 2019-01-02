
$(document)
    .ready(function () {
        $('img').on('dragstart', function (event) { event.preventDefault(); });
        $('.ui.form')
            .form({

                fields: {
                    account: {
                        identifier: 'username'/*name of input tag*/ ,
                        rules: [
                            {

                                type: 'empty',
                                prompt: 'Account not entered yet'
                            },
                            {
                                type: 'regExp[^((?![\\W]).)+$]',

                                prompt: function (value) {
                                    return '<i>Forbidden</i></br>' + value.replace(/[\w]/gi, '').split("").filter(function (x, n, s) {
                                        return s.indexOf(x) == n
                                    }).join("").replace(' ', 'space');
                                }
                            }
                        ]
                    },
                    password: {
                        identifier: 'passwd' /*name of input tag*/,
                        rules: [
                            {

                                type: 'empty',
                                prompt: 'Password not entered yet'
                            },
                            {

                                type: 'regExp[^((?![\\W]).)+$]',

                                prompt: function (value) {
                                    return '<i>Forbidden</i></br>' + value.replace(/[\w]/gi, '').split("").filter(function (x, n, s) {
                                        return s.indexOf(x) == n
                                    }).join("").replace(' ', 'space');
                                }
                            }
                        ]
                    }
                },
                on: 'change',
                inline: true
            })
            ;
    })
    ;
