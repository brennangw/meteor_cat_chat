if (Messages.find().count() === 0) {
    Messages.insert({
        sender: 'Me',
        content: 'Meteor is so cool!',
        time: 'RIGHT NOW!'
    });

    Messages.insert({
        sender: 'Bob',
        content: 'My wonderful message!!',
        time: '5:55pm'
    });

    Messages.insert({
        sender: 'Dan',
        content: 'Brennan is so cool!',
        time: 'Yesterday'
    });
}