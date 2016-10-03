/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Messages } from '../../lib/collections/messages.js';

if (Meteor.isServer) {
    describe('Messages', () => {
        describe('methods', () => {
            var userId;
            var userId2;
            let messageId;

            beforeEach(() => {
                // Accounts.remove({});
                if (!Accounts.findUserByEmail("tester@test.com")) {
                    userId = Accounts.createUser({
                        email: "tester@test.com",
                        username: "Mr. Tester Username",
                        password: "password123",
                        profile: {name: "Tester Name"}
                    });
                } else {
                    userId = Accounts.findUserByEmail("tester@test.com")._id;
                }

                if (!Accounts.findUserByEmail("2tester@test.com")) {
                    userId2 = Accounts.createUser({
                        email: "2tester@test.com",
                        username: "2Mr. Tester Username",
                        password: "2password123",
                        profile: {name: "2Tester Name"}
                    });
                } else {
                    userId2 = Accounts.findUserByEmail("2tester@test.com")._id;
                }

                Messages.remove({});
            });

            it('1 user can send 1 message', () => {
                const insertMessage = Meteor.server.method_handlers['messageInsert'];
                var content = "test message";
                var message = { content: content};
                const invocation = { userId };
                insertMessage.apply(invocation, [message]);
                assert.equal(Messages.find().count(), 1);
            });

            it('2 users can send 2 messages (1 each)', () => {
                const insertMessage = Meteor.server.method_handlers['messageInsert'];

                //message 1
                var content = "test message";
                var message = { content: content};
                const invocation = { userId };
                insertMessage.apply(invocation, [message]);

                //message 2
                var content2 = "2test message";
                var message2 = { content: content2};
                userId = userId2; //the fact this is needed is really weird.
                const invocation2 = { userId };
                console.log("userId2: " + userId2);
                insertMessage.apply(invocation2, [message2]);

                assert.equal(Messages.find().count(), 2);
            });

            it('1 users can send a message and the content is correct', () => {
                const insertMessage = Meteor.server.method_handlers['messageInsert'];

                //message 1
                var content = "test message";
                var message = { content: content};
                const invocation = { userId };
                insertMessage.apply(invocation, [message]);


                assert.equal(Messages.find().count(), 1);
                assert.equal(Messages.findOne().content, "test message");
            });

        });
    });
}