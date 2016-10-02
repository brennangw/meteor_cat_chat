/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Messages } from '../../lib/collections/messages.js';

if (Meteor.isServer) {
    describe('Messages', () => {
        describe('methods', () => {
            var userId;
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
                    userId = Accounts.findUserByEmail("tester@test.com")._id

                }
                Messages.remove({});
            });

            it('can delete owned task', () => {
                // Find the internal implementation of the task method so we can
                // test it in isolation
                const insertMessage = Meteor.server.method_handlers['messageInsert'];

                // Set up a fake method invocation that looks like what the method expects
                var content = "test message";
                var message = { content: content};

                const invocation = { userId };

                // Run the method with `this` set to the fake invocation
                insertMessage.apply(invocation, [message]);

                // Verify that the method does what we expected
                assert.equal(Messages.find().count(), 1);
            });
        });
    });
}