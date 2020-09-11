const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: String,
    description: String,
    author: [{                              // OJO!: Es un ARRAY de ObjectID's
        type: Schema.Types.ObjectId,
        ref: 'Author'                       // Nombre del modelo referenciado
    }],
    rating: Number
}, {
    timestamps: true
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;