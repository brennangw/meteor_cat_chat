Template.messageSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var message = {
            content: $(e.target).find('[name=message]').val(),
            time: "placeholder time",
            sender: "placeholder sender"
        };

        Messages.insert(message);
    }
});