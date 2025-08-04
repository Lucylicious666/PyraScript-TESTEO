const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { authenticate } = require('../middleware/auth');

// Crear publicación
router.post('/', authenticate, async (req, res) => {
  try {
    const { content, image } = req.body;
    
    const post = new Post({
      content,
      image,
      user: req.user.id
    });

    await post.save();
    
    // Emitir evento de nueva publicación via WebSocket
    req.app.get('wss').clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ type: 'NEW_POST', post }));
      }
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todas las publicaciones
router.get('/', authenticate, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username avatar')
      .sort({ createdAt: -1 });
      
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like a publicación
router.post('/:id/like', authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Publicación no encontrada' });
    }
    
    // Verificar si ya dio like
    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter(id => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }
    
    await post.save();
    
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;