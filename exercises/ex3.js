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
    /*  Create Query
        Find published courses where the price is >= 15
        OR course title contains the word `by`.
    */
    return courses = await Course
        .find()
        .or([
            {isPublished: true}, { price: { $gte: 15 }},
            { name: /.*by.*/i }
        ])
        .select('name price');    
}

// Enforcing Seperation of Concerns
async function run() {
    const courses = await getPublishedCourses();
    console.log(courses);
}

run();