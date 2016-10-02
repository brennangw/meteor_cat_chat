Messages = new Mongo.Collection('messages');

Posts = new Mongo.Collection('posts');

Meteor.methods({
    messageInsert: function(messageAttributes) {
        check(Meteor.userId(), String);
        check(messageAttributes, {
            content: String
        });

        var user = Meteor.user();
        var message = _.extend(messageAttributes, {
            userId: user._id,
            sender: user.emails[0].address,
            time: new Date()
        });

        var messageId = Messages.insert(message);

        return {
            _id: messageId
        };
    }
});