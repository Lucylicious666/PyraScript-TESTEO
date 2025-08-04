// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/pyrascript', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Modelos
const User = mongoose.model('User', {
    username: String,
    password: String,
    email: String,
    wyrtyBalance: Number,
    projects: Array,
    joinDate: Date
});

const Project = mongoose.model('Project', {
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    type: String,
    description: String,
    fileUrl: String,
    uploadDate: Date,
    downloads: Number
});

// Rutas
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (user && bcrypt.compareSync(password, user.password)) {
        res.json({ success: true, user });
    } else {
        res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
});

// Más rutas para proyectos, wyrty, etc.

app.listen(3000, () => {
    console.log('Servidor PyraScript ejecutándose en http://localhost:3000');
});