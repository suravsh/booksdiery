var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
router.use(bodyParser.urlencoded({ extended: true }))

var marko = require('marko');
var reviewsTemplate = marko.load(require.resolve('../views/reviews.marko'));

module.exports = function (app) {
  app.use(/\/reviews\/*.*/, router);
};

router.get(/\/*.*/, function(req, res) {

	var bid = (req.query.bid) ? (req.query.bid) : 0;
	if (bid == 0) {
	} else  {
		mongoose.model('Books').find({_id:bid}, function(err, books) {
			var reviews = books[0].reviews;
			for (var i=0; i<reviews.length; i++) {
				var review = books[0].reviews[i];
				for (var j = 1; j <= 5; j++) {
					review['srno'] = (i + 1);
	            	if (j <= Math.ceil(review.rating)) review['is' + j + 'Checked'] = 'checkedStar';
	            	else review['is' + j + 'Checked'] = 'uncheckedStar';
	            }
	            reviews[i] = review;
			}
			books[0].reviews = reviews;
			if(err)
				reviewsTemplate.render({err : 1, data: 'Unable to retrive records.'}, res);
			else {
				reviewsTemplate.render({err : 0, data: books}, res);
			}
		});
	}
});


router.post('/', function(req, res) {
		var bid = req.body.bid;
		var name = req.body.name;
		var review = req.body.review;
		var rating = req.body.rating;
		
		var reviews = [];
		var review = {name: name, review: review, rating: rating };
		var averageRating = 0;

		mongoose.model('Books').find({_id:bid}, function(err, book) {
			if(err)
				reviewsTemplate.render({err : 1, data: 'Unable to retrive records.'}, res);
			else {
				var reviews =  book[0].reviews ? book[0].reviews : [];
				reviews.push(review);
				var averageRating = reviews.reduce(function (sum, review) {return sum + review.rating;}, 0) / reviews.length;
				mongoose.model('Books').update({_id:bid},{averageRating: averageRating, reviews: reviews}, function(err, book) {
					if(err) {
						var msg = 'There was an error when adding the information to the database!';					
						reviewsTemplate.render({err : 1, msg: msg}, res);
					} else {
						var msg = 'Record added successfully.';					
						console.log('Request id : 2');
						res.redirect('/reviews=?bid=' + bid);
					}
				});
			}
		});
});



//module.exports = router;
