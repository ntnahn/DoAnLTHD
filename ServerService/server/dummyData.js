var Point = require('./models/point');

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
};