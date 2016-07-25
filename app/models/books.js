var mongoose = require('mongoose'); 

var reviewsSchema = new mongoose.Schema({  
  name: String,
  review: String,
  rating: Number,
  date: { type: Date,  default: Date.now }
});

var bookSchema = new mongoose.Schema({  
  title: String,
  author: String,
  isbn : { type : String , unique : true},
  price: Number,
  contactNumber: Number,
  reviews: [reviewsSchema],
  averageRating: { type: Number,  default: 0 },
  date: { type: Date,  default: Date.now }
});


bookSchema.path('price').get(function(num) {
  return (num).toFixed(2);
});

bookSchema.path('price').set(function(num) {
  return num;
});

mongoose.model('Books', bookSchema);