
const Blog = require("../Model/BlogSchema")
const login =  require("../Model/LoginSchema")
const mongoose = require('mongoose');
const allBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});  
    res.status(200).json(blogs);  
  } catch (error) {
    console.error('Error retrieving blogs:', error.message);  
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const cryptoBlogs = async (req, res) => {
  try {
    
    const blogs = await Blog.find({ category: 'Crypto' });  
    res.status(200).json(blogs);  
  } catch (error) {
    console.error('Error retrieving blogs:', error.message);  
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
const cricketBlogs = async (req, res) => {
  try {
   
    const blogs = await Blog.find({ category: 'Cricket' });  
    res.status(200).json(blogs);  
  } catch (error) {
    console.error('Error retrieving blogs:', error.message);  
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
const travelBlogs = async (req, res) => {
  try {
    
    const blogs = await Blog.find({ category: 'Travel' });  
    res.status(200).json(blogs);  
  } catch (error) {
    console.error('Error retrieving blogs:', error.message);  
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
const technologyBlogs = async (req, res) => {
  try {
 
    const blogs = await Blog.find({ category: 'Technology' });  
    res.status(200).json(blogs);  
  } catch (error) {
    console.error('Error retrieving blogs:', error.message);  
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
const fashionBlogs = async (req, res) => {
  try {
   
    const blogs = await Blog.find({ category: 'Fashion' });  
    res.status(200).json(blogs);  
  } catch (error) {
    console.error('Error retrieving blogs:', error.message);  
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
const healthBlogs = async (req, res) => {
  try {
 
    const blogs = await Blog.find({ category: 'Health' });  
    res.status(200).json(blogs);  
  } catch (error) {
    console.error('Error retrieving blogs:', error.message);  
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
const scienceBlogs = async (req, res) => {
  try {
  
    const blogs = await Blog.find({ category: 'Science' });  
    res.status(200).json(blogs);  
  } catch (error) {
    console.error('Error retrieving blogs:', error.message);  
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const searchBlogs = async (req, res) => {
  try {
    const query = req.query.query; 

    const blogs = await Blog.find({ title: { $regex: new RegExp(query, 'i') } });
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error searching blogs:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const tipId = req.body.userId; 
    console.log(tipId);
    const deletedTip = await Blog.deleteOne({ _id: tipId });
    if (deletedTip.deletedCount === 1) {
      res.status(200).json({ message: 'Blog deleted successfully' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createBlogPost = async (req, res) => {
  try {
    const newBlogPost = new Blog(req.body); 
    await newBlogPost.save(); 
    res.status(201).json({
      message: 'Blog post created successfully!',
      data: newBlogPost
    });
  } catch (error) {
    console.error('Failed to create blog post:', error);
    res.status(400).json({
      message: 'Failed to create blog post',
      error: error.message
    });
  }
};

const getBlogById = async (req, res) => {
  const blogId = req.params.id;
  console.log(blogId);


  if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ success: false, message: 'Invalid blog ID' });
  }

  try {
      const blog = await Blog.findById(blogId).lean().select('-__v'); 

      if (!blog) {
          return res.status(404).json({ success: false, message: 'Blog not found' });
      }

      res.json({ success: true, blog: blog });
  } catch (error) {
      console.error('Error fetching blog:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch blog', error: error.message });
  }
};


const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await login.findOne({ email, password });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin login successful' });
  } catch (error) {
    console.error('Error logging in admin:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = {
  createBlogPost,cryptoBlogs, allBlogs,
  cricketBlogs,travelBlogs,technologyBlogs,scienceBlogs,healthBlogs,fashionBlogs,
  searchBlogs,deleteBlog,getBlogById,adminLogin
};
