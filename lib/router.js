Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {return Meteor.subscribe('messages')}
});


Router.route('/', {name: 'messages'});


var requireLogin = function() {
    if (Meteor.user()) {
        this.next();
    } else {
        this.render('notLoggedIn');
    }
}

//hooks
Router.onBeforeAction(requireLogin, {only: 'messages'});