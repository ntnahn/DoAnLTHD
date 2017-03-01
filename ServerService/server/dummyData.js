var Client = require('./models/client');
var User = require('./models/user');

module.exports = function () {
    Client.count().exec((err, count) => {
        if (count > 0) {
            return;
        }
        const clients = [
            new Client({
                id: 'pointkv4q01ck7453ualdnd01',
                phone: '01234567890',
                address: '123, Nguyen Van Cu, Q.5, HCM',
                type: 'normal'
            })
        ];

        Client.create(clients, (error) => {
            if (error) {
                console.log('Insert Clients failed!');
                console.log(error);
            } else {
                console.log('Insert Clients success!');
            }
        });
    });

    User.count().exec((err, count) => {
        if (count > 0) {
            return;
        }
        const users = [
            new User({
                id: 'pointkv4q01ck7453ualdnd01',
                name: 'TranVanTrai',
                password: '12345',
                location: {lat: 10.772546, long: 106.678567},
                vehicletype: 'normal'
            })
        ];

        User.create(users, (error) => {
            if (error) {
                console.log('Insert User failed!');
                console.log(error);
            } else {
                console.log('Insert User success!');
            }
        });
    });
};