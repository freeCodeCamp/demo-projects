// jQuery based Ajax functions
var AjaxFunctions = {

    post: function(url, data, done) {
        $.ajax({
            url: url,
            dataType: 'json',
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify(data),
            success: function(data) {
                done(null, data);
            },
            error: function(err) {
                done(err);
            }
        });
    },
    put: function(url, data, done) {
        $.ajax({
            url: url,
            dataType: 'json',
            contentType: 'application/json',
            type: 'PUT',
            data: JSON.stringify(data),
            success: function(data) {
                done(null, data);
            },
            error: function(err) {
                done(err);
            }
        });
    },
    get: function(url, done) {
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                done(null, data);
            },
            error: function(err) {
                done(err);
            }
        });
    },
    delete: function(url, data,  done){

        $.ajax({
            type: "DELETE",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(data) {
                done(null, data);
            }.bind(this),
            error: function(err) {
                done(err)
            },
            dataType: 'json'
        });
    }


}

module.exports = AjaxFunctions;