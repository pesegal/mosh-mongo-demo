const mongoose = require('mongoose');

// Connect to mongodb
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error("Could not connect to mongoDB."));

// Defines the shape of the data (specific to moongoose, not mongoDB)
const courseSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
        // match: /pattern/ 
    }, 
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: { 
        type: Array,
        validate: { // Custom Validator Function
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    // Do some async work
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag.'
        }
    }, 
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; }, // Can't be an arrow function because of JS BS (this ref)
        min: 5,
        max: 150
    }
});

// .. Define the model based on the schema
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    // Create a new Course object
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        category: '-',
        tags: null,
        isPublished: true,
        price: 150
    });

    try {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
}

createCourse();

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

    // --> Pagination Example
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10 realworld.

    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        // --> Example of comparison operators
        //.find({ price: { $gte: 10, $lte: 20 }}) 
        //.find({ price: { $in: [10, 15, 20] }})
        // --> Example of logical operators
        // .find()
        // .or([ {author: 'Mosh' }, { isPublished: true } ])
        // .and([])
        // --> Regular Expression Examples
        // .find( {author: /^Mosh/ })
        // --> Pagination Example
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .countDocuments();
    console.log(courses);
}

async function updateCourse(id) {
    // Approach: Update First
    // Update directly
    // Optional: Get Updated Document
    const result = await Course.findByIdAndUpdate(id, {
        // MongoDB Update Operators
        $set: {
            author: 'Hello',
            isPublished: true
        }
    }, { new: true } );
    console.log(result);
}

async function removeCourse(id) {
    // const result = await Course.deleteOne( { _id: id });
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}
