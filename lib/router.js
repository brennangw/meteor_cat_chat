Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
});

Router.route('/:messagesLimit?', {

    name: 'messages',
    waitOn: function() {
        var limit = parseInt(this.params.messagesLimit) || 5;
        return Meteor.subscribe('messages', {sort: {time: -1}, limit: limit});
    }
});

var requireLogin = function() {
    if (Meteor.user()) {
        this.next();
    } else {
        if (Meteor.loggingIn()) {
            this.render('loading');
        }
        this.render('notLoggedIn');
    }
}

//hooks
Router.onBeforeAction(requireLogin, {only: 'messages'});


