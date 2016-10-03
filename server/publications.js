import { Messages } from '../lib/collections/messages.js';
Meteor.publish('messages', function(options) {
    check(options, {
        sort: Object,
        limit: Number
    });
    return Messages.find({}, options);
});