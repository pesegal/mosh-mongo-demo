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

async function createCourse() {
    // Create a new Course object
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    // MongoDB comparison operators::
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // MongoDB: Logical Operators
    // or
    // and

    const courses = await Course
        //.find({ author: 'Mosh', isPublished: true })
        // --> Example of comparison operators
        //.find({ price: { $gte: 10, $lte: 20 }}) 
        //.find({ price: { $in: [10, 15, 20] }})
        // --> Example of logical operators
        // .find()
        // .or([ {author: 'Mosh' }, { isPublished: true } ])
        // .and([])
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1});
    console.log(courses);
}

getCourses();