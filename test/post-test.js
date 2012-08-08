var post = require('../lib/post')
  , mongoose = require('mongoose')
  , should = require('should')
  , util = require('util');

// Setup dummy db
mongoose.connect('mongodb://localhost/post_test_db');

describe('Post', function () {
	var currentPost = null;

	// Before every test...
	beforeEach(function(done) {
		// Create a dummy post to have something in our db.
		post.create('Post one', 'Text...', function (newPost) {
			currentPost = newPost;
			done();
		})
	});

	// After each test
	afterEach(function(done) {
		// Remove all posts to start with fresh install...
		post.Model.remove({}, function() {
			done();
		});
	});


	it('should have a method create', function() {
		post.should.have.property('create');
		post.create.should.be.a('function');
	});

	it('should have a property model', function() {
		post.should.have.property('Model');
	});

	it('should have a method findBydId', function () {
		post.should.have.property('findById');
		post.findById.should.be.a('function');
	});

	it('should have a method find', function () {
		console.log(currentPost);
		post.should.have.property('find');
		post.find.should.be.a('function');
	});


	describe('#create()', function () {

		it('should create a post and return it', function (done) {
			var title = 'Custom title';
		    var text = 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod. Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui.';
			post.create(title, text, function(newPost) {
				newPost.title.should.equal(title);
				newPost.text.should.equal(text);
				done();
			});
		});

		it('should store a post in the database', function (done) {
			var title = 'Custom title dsqfkjdqsfj';
		    var text = 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod. Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui.';
			
			post.create(title, text, function(newPost) {
				post.Model.findById(newPost._id, function(err, post) {
					should.exist(post);
					done();
				});
			});
		});
	});


	describe('#model', function() {

		it('should be named post', function (){
			post.Model.modelName.should.equal('post');
		});
	});


	describe('#findById()', function() {

		it('should find a post given its id', function (done) {
			post.create('title', 'body', function (newPost) {
				post.findById(newPost._id, function (foundPost) {
					should.exist(foundPost);
					done();
				});
			});
		});

		it('should not find bogus ids', function (done) {
			post.findById('47cc67093475061e3d95369d', function (foundPost){
				should.not.exist(foundPost);
				done();
			});
		});

	});


	describe('#find()', function() {

		it('should return an array', function (done) {
			post.find(function(posts) {
				posts.should.be.an.instanceOf(Array);
				done();
			});
		});

		it('should contain our posts', function (done) {
			post.find(function(posts) {
				console.log('posts...');
				console.log(util.inspect(posts));
				console.log('currentpost...');
				console.log(util.inspect(currentPost));
				posts.should.include(currentPost);
				done();
			});
		});

	})

});
