const router = require('express').Router();
const User = require('../model/User');

// any route in here is pre-pended with /auth because this file inside auth folder
router.get('/', (req, res) => {
  res.json({
    message: 'User 🔐',
  });
});

//TODO => POST REQUEST
router.post('/info', async (req, res) => {
  console.log('post request', req.body);
  // res.send(req.body);
  const { username, email, password } = req.body;
  const user = new User({
    username: username,
    email: email,
    password: password,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    // res.status(400).send(err);
    res.status(400).json(err);
  }
});

//TODO <== GET REQUEST
router.get('/info', async (req, res) => {
  try {
    const userData = await User.find();
    res.json(userData);
  } catch (err) {
    res.json({ message: err });
  }
});

//TODO <== GET REQUEST WITH SPECIFIC ID
router.get('/info/:userID', async (req, res) => {
  const { userID } = req.params;
  try {
    const specificUser = await User.findById(userID);
    res.json(specificUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//TODO <==> DELETE USER SPECIFIC
router.get('/info/:userID', async (req, res) => {
  const { userID } = req.params;
  try {
    const deleteUser = await User.remove({ _id: userID });
    res.json(deleteUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//TODO ==> UPDATE USER SPECIFIC
router.patch('/info/:userID', async (req, res) => {
  const { userID } = req.params;
  try {
    const updateUser = await User.updateOne(
      { _id: userID },
      { $set: { username: req.body.username } },
    );
    res.json(updateUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
