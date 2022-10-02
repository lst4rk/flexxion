const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
// const Workout = require("../models/Workout");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const posts = await Post.find({ user: req.params.id });
      res.render("profile.ejs", { posts: posts, user: user});
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).populate({path: 'user', select: 'userName'}).lean();
      // const date = new Date(posts.createdAt.toDateString());
      // console.log(date)
      // const formattedDate = `${date.getMonth()+1} / ${date.getMonth()}`
      res.render("feed.ejs", { posts: posts, userName: req.user.userName, user: req.user.id });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      // const user = await User.findById(req.params.id)
      const post = await Post.findById(req.params.id).populate('user');
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).populate('user').lean();
      res.render("post.ejs", { post: post, user: req.user.id, comments: comments, userName: req.user.userName});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.
        create({
          title: req.body.title,
          image: result.secure_url,
          cloudinaryId: result.public_id,
          caption: req.body.caption,
          likes: 0,
          user: req.user.id,
          exercise1: req.body.exercise1,
          sets1: req.body.sets1,
          reps1: req.body.reps1,
          exercise2: req.body.exercise2,
          sets2: req.body.sets2,
          reps2: req.body.reps2,
          exercise3: req.body.exercise3,
          sets3: req.body.sets3,
          reps3: req.body.reps3,
        })
      console.log("Post has been added!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
  getNewWorkout: async(req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const posts = await Post.find({ user: req.user.id });
      res.render("newWorkout.ejs", { posts: posts, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },

};
