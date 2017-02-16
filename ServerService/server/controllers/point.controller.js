var cuid = require('cuid');
var path = require('path');
var Point = require('../models/point');
var exports = module.exports;
// Trả về toàn bộ danh sách các điểm mà điện thoại viên đã nhập
exports.getPoints = function (req, res) {
  Point.find().exec((err, points) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(points);
  });
};
// Trả về một điểm mà điện thoại viên đã nhập
exports.getOnePoint = function (req, res) {
  Point.findOne().exec((err, point) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(point);
  });
};
// Thêm mới điểm
exports.addPoint = function (req, res) {
  let point = req.body.point;
  console.log('Begin add new point!');
  console.log(point);
  if (typeof point === 'undefined') {
    res.status(403).end();
  }

  let pointModel = new Point(point);
  pointModel.id = cuid();
  pointModel.save((err, pointInserted) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(pointInserted);
  });
};
