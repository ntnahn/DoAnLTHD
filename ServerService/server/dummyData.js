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
                id: 'user0kv4q01ck7453ualdnd01',
                "name" : "TranVanTrai",
                "password" : "12345",
                "vehicletype" : "normal",
                "location" : {
                    "lat" : 10.767647398680138,
                    "lng" : 106.67454242706299
                }
            }),
            new User({
                id: 'user1kv4q01ck7453ualdnd01',
                "name" : "Nguyễn Thanh Nhàn",
                "password" : "12345",
                "vehicletype" : "premium",
                "location" : {
                    "lat" : 10.759173173901845,
                    "lng" : 106.67752504348755
                }
            }),
            new User({
                id: 'user2kv4q01ck7453ualdnd01',
                "name" : "Nguyễn Văn A",
                "password" : "12345",
                "vehicletype" : "normal",
                "location" : {
                    "lat" : 10.75740241027677,
                    "lng" : 106.66718244552612
                }
            }),
            new User({
                id: 'user3kv4q01ck7453ualdnd01',
                "name" : "Nguyễn Thị B",
                "password" : "12345",
                "vehicletype" : "premium",
                "location" : {
                    "lat" : 10.763347075583702,
                    "lng" : 106.6592001914978
                }
            })
        ];

        User.create(users, (error) => {
            if (error) {
                console.log('Insert Users failed!');
                console.log(error);
            } else {
                console.log('Insert Users success!');
            }
        });
    });
};