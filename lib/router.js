Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
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
};

//this name is very important must match the template
MessagesController = RouteController.extend({
    template: 'messages',
    increment: 5,
    messagesLimit: function() {
        return parseInt(this.params.messagesLimit) || this.increment;
    },
    findOptions: function() {
        return {sort: {time: -1}, limit: this.messagesLimit()};
    },
    subscriptions: function() {
        this.messagesSub = Meteor.subscribe('messages', this.findOptions());
    },
    messages: function() {
        return Messages.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.messages().count() === this.messagesLimit();
        var nextPath = this.route.path({messagesLimit: this.messagesLimit() + this.increment});
        return {
            messagesData: this.messages(),
            nextPath: hasMore ? nextPath : null,
            ready: this.messages.ready,
        };
    }
});


Router.route('/:messagesLimit?', {
    name: 'messages',
});






//hooks
Router.onBeforeAction(requireLogin, {only: 'messages'});


