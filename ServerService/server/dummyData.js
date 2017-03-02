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
                "name" : "TVT1",
                "password" : "12345",
                "vehicletype" : "normal",
                "location" : {
                    "lat" : 10.767647398680138,
                    "lng" : 106.67454242706299
                }
            }),
            new User({
                id: 'user1kv4q01ck7453ualdnd01',
                "name" : "TVT2",
                "password" : "12345",
                "vehicletype" : "premium",
                "location" : {
                    "lat" : 10.759173173901845,
                    "lng" : 106.67752504348755
                }
            }),
            new User({
                id: 'user2kv4q01ck7453ualdnd01',
                "name" : "TVT3",
                "password" : "12345",
                "vehicletype" : "normal",
                "location" : {
                    "lat" : 10.75740241027677,
                    "lng" : 106.66718244552612
                }
            }),
            new User({
                id: 'user3kv4q01ck7453ualdnd01',
                "name" : "TVT4",
                "password" : "12345",
                "vehicletype" : "premium",
                "location" : {
                    "lat" : 10.763347075583702,
                    "lng" : 106.6592001914978
                }
            }),
            new User({
                id: 'user4kv4q01ck7453ualdnd01',
                "name" : "TVT5",
                "password" : "12345",
                "vehicletype" : "normal",
                "location" : {
                    "lat" : 10.766525,
                    "lng" : 106.681965
                }
            }),
            new User({
                id: 'user5kv4q01ck7453ualdnd01',
                "name" : "TVT6",
                "password" : "12345",
                "vehicletype" : "normal",
                "location" : {
                    "lat" : 10.762154,
                    "lng" : 106.682512
                }
            }),
            new User({
                id: 'user6kv4q01ck7453ualdnd01',
                "name" : "TVT7",
                "password" : "12345",
                "vehicletype" : "normal",
                "location" : {
                    "lat" : 10.760623,
                    "lng" : 106.681377
                }
            }),
            new User({
                id: 'user7kv4q01ck7453ualdnd01',
                "name" : "TVT8",
                "password" : "12345",
                "vehicletype" : "premium",
                "location" : {
                    "lat" : 10.763693,
                    "lng" : 106.679060
                }
            }),
            new User({
                id: 'user8kv4q01ck7453ualdnd01',
                "name" : "TVT9",
                "password" : "12345",
                "vehicletype" : "normal",
                "location" : {
                    "lat" : 10.759772,
                    "lng" : 106.680176
                }
            }),
            new User({
                id: 'user9kv4q01ck7453ualdnd01',
                "name" : "TVT20",
                "password" : "12345",
                "vehicletype" : "premium",
                "location" : {
                    "lat" : 10.765907,
                    "lng" : 106.679533
                }
            }),
            new User({
                id: 'user3kv4q01ck7453ualdnd02',
                "name" : "NTN1",
                "password" : "12345",
                "vehicletype" : "premium",
                "location" : {
                    "lat" : 10.769153,
                    "lng" : 106.685562
                }
            }),
            new User({
                id: 'user3kv4q01ck7453ualdnd03',
                "name" : "NTN2",
                "password" : "12345",
                "vehicletype" : "normal",
                "location" : {
                    "lat" : 10.766602,
                    "lng" : 106.688287
                }
            }),
            new User({
                id: 'user3kv4q01ck7453ualdnd04',
                "name" : "NTN3",
                "password" : "12345",
                "vehicletype" : "normal",
                "location" : {
                    "lat" : 10.767656,
                    "lng" : 106.674683
                }
            }),
            new User({
                id: 'user3kv4q01ck7453ualdnd05',
                "name" : "NTN4",
                "password" : "12345",
                "vehicletype" : "premium",
                "location" : {
                    "lat" : 10.770439,
                    "lng" : 106.676786
                }
            }),
            new User({
                id: 'user3kv4q01ck7453ualdnd06',
                "name" : "NTN5",
                "password" : "12345",
                "vehicletype" : "premium",
                "location" : {
                    "lat" : 10.770165,
                    "lng" : 106.681786
                }
            }),
            new User({
                id: 'user3kv4q01ck7453ualdnd07',
                "name" : "NTN6",
                "password" : "12345",
                "vehicletype" : "normal",
                "location" : {
                    "lat" : 10.766349,
                    "lng" : 106.678073
                }
            }),
            new User({
                id: 'user3kv4q01ck7453ualdnd08',
                "name" : "NTN7",
                "password" : "12345",
                "vehicletype" : "normal",
                "location" : {
                    "lat" : 10.766012,
                    "lng" : 106.673331
                }
            }),
            new User({
                id: 'user3kv4q01ck7453ualdnd09',
                "name" : "NTN8",
                "password" : "12345",
                "vehicletype" : "normal",
                "location" : {
                    "lat" : 10.758718,
                    "lng" : 106.677666
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