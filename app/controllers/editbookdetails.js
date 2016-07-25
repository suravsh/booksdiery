var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
router.use(bodyParser.urlencoded({ extended: true }))

var marko = require('marko');
var booksTemplate = marko.load(require.resolve('../views/editDetails.marko'));

module.exports = function (app) {
  app.use(/\/editDetails\/*.*/, router);
};


router.get(/\/*.*/, function(req, res) {
	var bid = (req.query.bid) ? (req.query.bid) : 0;
	if (bid == 0) {
	} else  {
		mongoose.model('Books').find({_id:bid}, function(err, books) {
			if(err)
				booksTemplate.render({err : 1, data: 'Unable to retrive records.'}, res);
			else
				booksTemplate.render({err : 0, data: books}, res);
		});
	}
});

//module.exports = router;
