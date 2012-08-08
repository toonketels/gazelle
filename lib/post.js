var Post = function () {

	var mongoose = require('mongoose');

	var Schema = mongoose.Schema;

	var postSchema = new Schema({
		title: String
	  , text: String
	});

	var PostModel = mongoose.model('post', postSchema);


	// @todo: emit an event
	var create = function(title, text, callback) {
		var post = new PostModel({
			title: title
		  , text: text
		});
		post.save(function(err) {
			if(err) {
				return console.log(err);
			}
		});
		return callback(post);
	};

	var findById = function(id, callback) {
		PostModel.findById(id, function (err, foundPost) {
			if(err) {
				console.log(err);
			}
			callback(foundPost);
		})
	};

	var find = function(callback) {
		PostModel.find(function(err, posts) {
			if(err) {
				return console.log(err);
			}
			return callback(posts);
		});
	}


	return {
		create: create
	  , Model: PostModel
	  , findById: findById
	  , find: find
	}

}();

module.exports = Post;