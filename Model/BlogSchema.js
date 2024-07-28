const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    heading: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: false }
});

const blogPostSchema = new Schema({
    date: { type: Date, required: true, index: true }, 
    title: { type: String, required: true, index: 'text' }, 
    overview: { type: String, required: true },
    readTime: { type: String, required: true },
    chip: {
        label: { type: String, required: true },
        color: { type: String, required: true }
    },
    category: { type: String, required: true, index: true }, 
    sections: [sectionSchema]
}, {
    timestamps: true
});

blogPostSchema.index({ title: 'text', category: 1 });

const Blog = mongoose.model('BlogPost', blogPostSchema);
module.exports = Blog;
