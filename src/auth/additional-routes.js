const express = require('express');
const router = express.Router();
const bearerAuth = require('../middleware/barer-auth-middleware.js');

router.get('/public', (req, res) => {
  res.status(200).send('Anyone can see this!!')
});

router.get('/private', bearerAuth, (req, res) => {
  res.json({
    msg: 'Anyone signed in can see this, success!'
  });
});


// router.post('/secured-route/post', bearerAuth, (req, res) => {
//   res.json(req.body);
// });

// router.get('/list', bearerAuth, (req, res) => {
//   res.json({
//     list: users.list()
//   });
// });

// router.post('/create', bearerAuth, acl('create'), (req, res) => {
//   res.json({
//     msg: '/create worked'
//   });
// });

// router.put('/update', bearerAuth, acl('update'), (req, res) => {
//   res.send('ok');
// });

// router.delete('/delete', bearerAuth, acl('delete'), (req, res) => {
//   res.json({
//     msg: '/delete worked'
//   });
// });

module.exports = router;