
 describe('Home API Route Integration Tests', function(){

 	beforeEach((done)=>{
 		done();
 	});


 	describe('GET /home ', () =>{
 		this.timeout(100000); 
		it('should return user default if timeout is greater than 10000', function(done){			
			request.get('/api/v1/home')
 			.set('Accept', 'application/json')	
 			.timeout(100000)
 			.set('Authorization', 'Bearer fab6b909db3d24c4a0577894c9d29e6dd83f7c30be4e6e66c68cb31465b4fe0e')
 			.expect('Content-Type', /json/) 			
	 		.expect(200)
 			.end((err, res) => {
			    //default user object
 				expect(res.body.user).to.not.be.empty;
 				expect(res.body.user).to.have.property('id').to.be.equal(0); 				
 				expect(res.body.user).to.have.property('name').that.is.equal('Hello'); 
 				expect(res.body.user).to.have.property('email').that.is.equal('');
 				expect(res.body.user).to.have.property('sign_in_count').that.is.equal(1);
 				expect(res.body.user).to.have.property('location').that.is.equal('');
 				expect(res.body.user).to.have.property('badge_text').that.is.equal('Newbie Badge');
 				expect(res.body.user).to.have.property('badge_image').that.is.equal('https://www.alotofpilates.com/assets/badges/badge4.png');
 				expect(res.body.user).to.have.property('favorites_count').that.is.equal(0);
 				expect(res.body.user).to.have.property('custom_class_count').that.is.equal(0);
 				expect(res.body.user).to.have.property('workout_taken_count').that.is.equal(0);
 				expect(res.body.user).to.have.property('subscriptions').that.is.an('array');
 				expect(res.body.user.subscriptions[0]).to.have.property('id').to.be.equal(0); 	
 				expect(res.body.user.subscriptions[0]).to.have.property('plan_id').to.be.equal(1); 	
 				expect(res.body.user.subscriptions[0]).to.have.property('status').to.be.equal('active'); 	
 				expect(res.body.user.subscriptions[0]).to.have.property('active_until').to.be.equal(''); 	
 				expect(res.body.user.subscriptions[0]).to.have.property('type').to.be.equal('TRIAL'); 	
 				expect(res.body.user.subscriptions[0]).to.have.property('plan_name').to.be.equal('Free'); 	
 				done(err);
 			});

		});

 		it('should return home default data if token is not sent', (done) => {
 			request.get('/api/v1/home')
 			.set('Accept', 'application/json')
 			.expect('Content-Type', /json/)
	 		.expect(200)
 			.end((err, res) => { 				
 				//default user object
 				expect(res.body.user).to.not.be.empty;
 				expect(res.body.user).to.have.property('id').to.be.equal(0); 				
 				expect(res.body.user).to.have.property('name').that.is.equal('Hello'); 
 				expect(res.body.user).to.have.property('email').that.is.equal('');
 				expect(res.body.user).to.have.property('sign_in_count').that.is.equal(1);
 				expect(res.body.user).to.have.property('location').that.is.equal('');
 				expect(res.body.user).to.have.property('badge_text').that.is.equal('Newbie Badge');
 				expect(res.body.user).to.have.property('badge_image').that.is.equal('https://www.alotofpilates.com/assets/badges/badge4.png');
 				expect(res.body.user).to.have.property('favorites_count').that.is.equal(0);
 				expect(res.body.user).to.have.property('custom_class_count').that.is.equal(0);
 				expect(res.body.user).to.have.property('workout_taken_count').that.is.equal(0);
 				expect(res.body.user).to.have.property('subscriptions').that.is.an('array');
 				expect(res.body.user.subscriptions[0]).to.have.property('id').to.be.equal(0); 	
 				expect(res.body.user.subscriptions[0]).to.have.property('plan_id').to.be.equal(1); 	
 				expect(res.body.user.subscriptions[0]).to.have.property('status').to.be.equal('active'); 	
 				expect(res.body.user.subscriptions[0]).to.have.property('active_until').to.be.equal(''); 	
 				expect(res.body.user.subscriptions[0]).to.have.property('type').to.be.equal('TRIAL'); 	
 				expect(res.body.user.subscriptions[0]).to.have.property('plan_name').to.be.equal('Free');
 				//Banner default
 				expect(res.body.banner_image).to.not.be.empty;  	
 				//Meditation default			
 				expect(res.body.meditations).to.be.an('array'); 
 				expect(res.body.meditations[0].path).to.be.empty; 
 				//Workout default
 				expect(res.body.workouts).to.be.an('array'); 
 				expect(res.body.workouts).to.have.lengthOf(4);
 				//Favorites default
 				expect(res.body.favorites).to.be.empty; 
 				//Activities default
 				expect(res.body.activities).to.have.property('recent_activities').that.is.an('array');
 				expect(res.body.activities).to.have.property('classes_taken_this_month').that.is.a('number');
 				expect(res.body.activities).to.have.property('classes_taken_this_week').that.is.a('number');
 				expect(res.body.activities).to.have.property('classes_taken_this_year').that.is.a('number');
 				expect(res.body.activities).to.have.property('minutes_taken_this_month').that.is.a('number');
 				expect(res.body.activities).to.have.property('minutes_taken_this_week').that.is.a('number');
 				expect(res.body.activities).to.have.property('minutes_taken_this_year').that.is.a('number'); 				
 				done(err);
 			})
 		})

 		// it('should return real user data if token is sent and token is valid and user is not a paid user', (done) => {
 		// 	request.get('/api/v1/home')
 		// 	.set('Accept', 'application/json')	
 		// 	.set('Authorization', 'Bearer fab6b909db3d24c4a0577894c9d29e6dd83f7c30be4e6e66c68cb31465b4fe0e')
 		// 	.expect('Content-Type', /json/)
	 	// 	.expect(200)
 		// 	.end((err, res) => { 				
 		// 		expect(res.body.user).to.not.be.empty;
 		// 		expect(res.body.user.subscriptions).to.be.an('array');

 		// 		expect(res.body.workouts).to.be.an('array'); 
 		// 		expect(res.body.workouts).to.have.lengthOf(4);

 		// 		expect(res.body.banner_image).to.not.be.empty; 
 			
 		// 		expect(res.body.activities).to.have.property('recent_activities').that.is.an('array');
 		// 		expect(res.body.activities).to.have.property('classes_taken_this_month').that.is.a('number');
 		// 		expect(res.body.activities).to.have.property('classes_taken_this_week').that.is.a('number');
 		// 		expect(res.body.activities).to.have.property('classes_taken_this_year').that.is.a('number');
 		// 		expect(res.body.activities).to.have.property('minutes_taken_this_month').that.is.a('number');
 		// 		expect(res.body.activities).to.have.property('minutes_taken_this_week').that.is.a('number');
 		// 		expect(res.body.activities).to.have.property('minutes_taken_this_year').that.is.a('number');

 				
 		// 		expect(res.body.favorites).to.be.empty; 
 		// 		expect(res.body).to.have.length > 0;

 		// 		expect(res.body.meditations).to.be.an('array');  
 		// 		//expect(res.body.meditations[0]).to.have.property('path').that.is.not.empty; 
 		// 		done(err);
 		// 	})
 		// })

 		// it('should return 401 if token is sent and token is invalid', (done) => {
 		// 	request.get('/api/v1/home')
 		// 	.set('Accept', 'application/json')	
 		// 	.set('Authorization', 'Bearer xxxxxx')
 		// 	.expect('Content-Type', /json/)
	 	// 	.expect(401)
 		// 	.end((err, res) => { 	
 		// 		expect(res.body.message).to.not.be.empty; 			 				
 		// 		done(err);
 		// 	})
 		// })

 		// it('should return real user data if token is sent and token is valid and user is a paid user', (done) => {
 		// 	request.get('/api/v1/home')
 		// 	.set('Accept', 'application/json')	
 		// 	.set('Authorization', 'Bearer ddd87fb9a543aa0c4d1dd58d55942606dbd5681bfec5311f4077d4b0610380a9')
 		// 	.expect('Content-Type', /json/)
	 	// 	.expect(200)
 		// 	.end((err, res) => { 		
 		// 		//m$, f$, a$, b$, w$, u$
 		// 		expect(res.body.user).to.not.be.empty; 				 				
 		// 		expect(res.body.user.subscriptions).to.be.an('array');

 		// 		expect(res.body.workouts).to.be.an('array'); 
 		// 		expect(res.body.workouts).to.have.lengthOf(4);

 		// 		expect(res.body.banner_image).to.not.be.empty; 

 		// 		expect(res.body.activities).to.have.property('recent_activities').that.is.an('array');
 		// 		expect(res.body.activities).to.have.property('classes_taken_this_month').that.is.a('number');
 		// 		expect(res.body.activities).to.have.property('classes_taken_this_week').that.is.a('number');
 		// 		expect(res.body.activities).to.have.property('classes_taken_this_year').that.is.a('number');
 		// 		expect(res.body.activities).to.have.property('minutes_taken_this_month').that.is.a('number');
 		// 		expect(res.body.activities).to.have.property('minutes_taken_this_week').that.is.a('number');
 		// 		expect(res.body.activities).to.have.property('minutes_taken_this_year').that.is.a('number');

 				
 		// 		expect(res.body.favorites).to.be.empty; 
 		// 		expect(res.body).to.have.length > 0;

 		// 		expect(res.body.meditations).to.be.an('array');  
 		// 		//expect(res.body.meditations[0]).to.have.property('path').that.is.not.empty; 
 				 
 		// 		done(err);
 		// 	})
 		// })



 	})
 });

