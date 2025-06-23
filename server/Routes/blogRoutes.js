const express = require('express')
const Post = require('../models/Post')
const router = express.Router()
const authMiddleware = require('../middleware/authmiddleware')

router.post('/', authMiddleware, async (req, res)=>{
    const {title, content} = req.body

    try{
        const oldPost = await Post.findOne({title})

        if(oldPost){
          return  res.status(400).json({
                message: 'Tilte alredy exists'
            })
        }
        const userId = req.user.id

        const createPost = Post.create({
            title,
            content,
            author: userId
        })
        res.status(201).json(createPost)
    }
    catch(err){
        res.status(500).json({
            message: 'blog creation failed'
        })
    }
})

router.get('/', authMiddleware, async (req,res)=>{
    try{
        const userId = req.user.id
        const userPosts = await Post.find({author: userId}).populate('author', 'username')
    res.status(200).json(userPosts);
    }
    catch(err){
        res.status(500).json({
            message: 'failed to fetch blogs'
        })
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const getSinglePost = await Post.findById(req.params.id).populate('author', 'username')
        res.status(200).json(getSinglePost);
    }
    catch(err){
        res.status(500).json({
            message: 'failed to get blog'
        })
    }
})

router.put('/:id', authMiddleware, async (req,res)=>{
    try{
        const {title, content} = req.body
        const post = await Post.findById(req.params.id)

        if(post.author.toString() !== req.user.id){
            return res.status(403).json({
                message: 'Not authorised to edit'
            })
        }

        post.title = title
        post.content = content
        await post.save()

        res.status(200).json(post)
    }
    catch(err){
         res.status(500).json({
            message: 'failed to edit blog'
        })
    }
})

router.delete('/:id', authMiddleware, async (req,res)=>{
    try{
        const post = await Post.findByIdAndDelete(req.params.id)

        if(!post){
            return res.status(404).json({
                message: 'post not found'
            })
        }

        if(post.author.toString() !== req.user.id){
           return res.status(403).json({
                message: 'Not authorised to delete'
            })
        }

        res.status(200).json({
            message: 'blog deleted'
        })
    }
    catch(err){
        res.status(500).json({
                message: 'failed to delete blog'
            })
    }
})

module.exports = router