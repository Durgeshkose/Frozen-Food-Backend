const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name email');
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch blogs', error });
    }
};

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name email');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog', error });
    }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Admin/User (depending on auth)
exports.createBlog = async (req, res) => {
    const { title, content, author, tags } = req.body;
    try {
        const newBlog = new Blog({
            title,
            content,
            author,
            tags,
        });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create blog', error });
    }
};

// @desc    Update blog by ID
// @route   PUT /api/blogs/:id
// @access  Admin/User
exports.updateBlog = async (req, res) => {
    const { title, content, tags } = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                tags,
                updatedAt: Date.now(),
            },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update blog', error });
    }
};

// @desc    Delete blog by ID
// @route   DELETE /api/blogs/:id
// @access  Admin/User
exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete blog', error });
    }
};
