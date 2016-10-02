Template.messageSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var message = {
            content: $(e.target).find('[name=message]').val(),
        };

        $(e.target).find('[name=message]').val('')

        Meteor.call('messageInsert', message, function(error, result) {
            // display the error to the user and abort
            if (error)
                return alert(error.reason);
        });

    }
});
