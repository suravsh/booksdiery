	var express = require('express');
	var router = express.Router();
	var mongoose = require('mongoose'); //mongo connection
	var marko = require('marko');
	var booksTemplate = marko.load(require.resolve('../views/books.marko'));
	var mres;
	var issearch = false;

	module.exports = function (app) {
	  app.use(/\/books\/*.*/, router);
	};

	router.route(/\/*.*/).get(function(req, res) {
		mres = res;
		var filterclause = {};
		if (req.query.query) {
			issearch = true;
			var re = new RegExp("(" + req.query.query+ ")", "i");
			try {
				mongoose.model('Books')
				        .find()
				        .or([
					        	{'title': { $regex: re }}
					            
							])
				        .sort('title')
				        .exec(processRecords);
				
			} catch(e){
				console.log(e);
			}
			return;
		}
		issearch = false;
		mongoose.model('Books').find(filterclause, processRecords);
	});
	router.route(/\/*.*/).post(function(req, res) {
			var title = req.body.title;
			var author = req.body.author;
			var isbn = req.body.isbn;
			var price = req.body.price;
			var reviews = [];
			var averageRating = 0;
			mongoose.model('Books').create({
				title: title,
				author: author,
				isbn: isbn,
				price: price,
				reviews: reviews,
				averageRating: averageRating
			}, function(err, book) {
				console.log(err);
				if(err) {
					var msg = 'There was an error when adding the information to the database!';					
					var result = {status:0, msg:msg};
					res.format({
						json: function(){
							res.json(result);
						}
					});
				} else {
					var msg = 'Record added successfully.';					
					var result = {status:1, msg:msg};
					res.format({
						json: function(){
							res.json(result);
						}
					});
				}
			});
	});
	router.route(/\/*.*/).put(function(req, res) {
			var bid = req.body.bid;
			var title = req.body.title;
			var author = req.body.author;
			var isbn = req.body.isbn;
			var price = req.body.price;
			console.log(price);
			var reviews = [];
			var averageRating = 0;

			var fields = {
				title: title,
				author: author,
				isbn: isbn,
				price: price
			}

			var filterclause = {
				_id : bid
			}

			mongoose.model('Books').update(filterclause, fields, function(err, book) {
				if(err) {
					var result = {msg:'There was an error when updating the information to the database!', status: 0};
				} else {
					var result = {msg:'Record modified successfully.', status:1};
				}
				res.format({
						json: function(){
							res.json(result);
						}
				});
			});
	});
	router.route(/\/*.*/).delete(function(req, res) {
			var bid = req.body.bid;
			try {
			    	mongoose.model('Books').remove({_id : bid}, function(err) {
			    	var result;
			    	if (err) {
			    		console.log(err);
			    		result = {msg:'There was an error when updating the information to the database!', status: 0};
			    	} else {
			    		result = {msg:'Record deleted successfully.', status:1};
			    	}
					res.format({
								json: function(){
									res.json(result);
								}
					});
			    });
			} catch (e) {
				console.log(e);
			}
	});

	function processRecords(err, books) {
		try {
			
			for (var i=0; i < books.length; i++) {
				var book = books[i];
				for (var j = 1; j <= 5; j++) {
					book['issearch'] = issearch;
					book['srno'] = (i + 1);
		          	if (j <= Math.ceil(book.averageRating)) book['is' + j + 'Checked'] = 'checkedStar';
		          	else book['is' + j + 'Checked'] = 'uncheckedStar';
		        }
		        books[i] = book;
			}
			(err) 
			? booksTemplate.render({err : 1, data: 'Unable to retrive records.'}, mres) 
			: booksTemplate.render({err : 0, data: books}, mres);
		} catch(e) {
			console.log(e);
		}
	}

	//module.exports = router;
