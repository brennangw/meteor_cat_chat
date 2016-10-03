export const Messages = new Mongo.Collection('messages');

Meteor.methods({
    messageInsert: function(messageAttributes) {
        check(this.userId, String);
        check(messageAttributes, {
            content: String
        });

        var message = _.extend(messageAttributes, {
            userId: this.userId,
            sender: Meteor.users.findOne(this.userId).emails[0].address,
            time: new Date()
        });

        var messageId = Messages.insert(message);

        return {
            _id: messageId
        };
    }
});

