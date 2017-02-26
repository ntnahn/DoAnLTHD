var Point = require('./models/point');
var User = require ('./models/user');

module.exports = function () {
  Point.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const points = [
      new Point({
        id: 'pointkv4q01ck7453ualdnd01',
        address: '123, Nguyen Van Cu, Q.5, HCM',
        type: 'normal'
      })
    ];

    Point.create(points, (error) => {
      if (error) {
        console.log('Insert Points failed!');
        console.log(error);
      } else {
        console.log('Insert Points success!');
      }
    });
  });

  User.count().exec((err, count) =>{
    if(count > 0){
      return;
    }
    const users = [
        new User({
            id:'pointkv4q01ck7453ualdnd01',
            name:'TranVanTrai',
            password:'12345',
            vehicletype:'normal'
        })
    ];

    User.create(users, (error) =>{
        if (error) {
            console.log('Insert User failed!');
            console.log(error);
        } else {
            console.log('Insert User success!');
        }
    });
  });
};