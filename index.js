var http = require('http');
//create a server object:
http.createServer(function (req, res) {
  res.write('My name is...  My name is...  Slim Shady!'); //write a response to the client
  res.end(); //end the response
}).listen(80) // the server object listens on port 80

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cloudnativedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  id: String,
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Registration API
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
});

// Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  res.json({ message: 'Login successful' });
});

// Search API
app.get('/users', async (req, res) => {
  const users = await User.find({}, 'id username email');
  res.json(users);
});

// Update Profile API
app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  const updatedUser = await User.findByIdAndUpdate(id, { username, email }, { new: true });
  if (!updatedUser) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'Profile updated successfully' });
});

// Delete User API
app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted successfully' });
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
