const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
    .then(() => console.log("Connected to localhost..."))
    .catch((err) => console.error("There was a connection error."));

// Define mongoose schema
const courseSchema = new mongoose.Schema({
    tags: [ String ],
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    date: { type: Date, default: Date.now }
});

// Define course model
const Course = mongoose.model('Course', courseSchema);

async function getPublishedCourses() {
    // Create Query
    const courses = await Course
        .find()
        .and([ { isPublished: true }, { tags: 'backend' } ])
        .sort({ name: 1 })
        .select({ name: 1, author: 1});
    
    console.log(courses);
}

getPublishedCourses();