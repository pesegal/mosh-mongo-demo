const mongoose = require('mongoose');

// Connect to mongodb
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error("Could not connect to mongoDB."));

// Defines the shape of the data (specific to moongoose, not mongoDB)
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ], 
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

// .. Define the model based on the schema
const Course = mongoose.model('Course', courseSchema);

const course = new Course({
    name: 'Node.js Course',
    author: 'Mosh',
    tags: ['node', 'backend'],
    isPublished: true
});
