const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true });

const commentSchema = new mongoose.Schema({
  videoId: String,
  username: String,
  text: String,
  likes: Number,
  dislikes: Number
});

const Comment = mongoose.model('Comment', commentSchema);

app.get('/comments/:videoId', async (req, res) => {
  const comments = await Comment.find({ videoId: req.params.videoId });
  res.json(comments);
});

app.post('/comments', async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  res.status(201).json(comment);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
