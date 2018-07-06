
 describe('Home API Route Integration Tests', function(){

 	this.timeout(1000000); 

 	beforeEach((done)=>{
 		done();
 	});


 	describe('GET /home ', () =>{
 		

 		it('should return workout default if takes longer than 10000ms to get response from workout api', (done) =>{			
			request.get('/api/v1/home')
 			.set('Accept', 'application/json')	
 			.timeout(10001)
 			.set('Authorization', 'Bearer fab6b909db3d24c4a0577894c9d29e6dd83f7c30be4e6e66c68cb31465b4fe0e')
 			.expect('Content-Type', /json/) 			
	 		.expect(200)
 			.end((err, res) => {
			    //default workout object
 				expect(res.body.workouts).to.not.be.empty;
 				expect(res.body.workouts).to.be.an('array'); 
 				expect(res.body.workouts).to.have.lengthOf(4); 			 		
 				expect(res.body.workouts[0]).to.have.property('id').to.be.equal(530); 	
 				expect(res.body.workouts[1]).to.have.property('id').to.be.equal(524); 	
 				expect(res.body.workouts[2]).to.have.property('id').to.be.equal(654); 	
 				expect(res.body.workouts[3]).to.have.property('id').to.be.equal(519);
 				done(err);
 			});

		});

		it('should return favorites default if takes longer than 4000ms to get response from favorities api', (done)=>{
 			request.get('/api/v1/home')
 			.set('Accept', 'application/json')	
 			.timeout(4001)
 			.set('Authorization', 'Bearer fab6b909db3d24c4a0577894c9d29e6dd83f7c30be4e6e66c68cb31465b4fe0e')
 			.expect('Content-Type', /json/) 			
	 		.expect(200)
 			.end((err, res)=>{
 				//Favorites default			
 				expect(res.body.favorites).to.be.empty; 

 				done(err);
 			})
 		});

 		it('should return meditation default if takes longer than 2000ms to get response from meditation api', (done)=>{
 			request.get('/api/v1/home')
 			.set('Accept', 'application/json')	
 			.timeout(5001)
 			.set('Authorization', 'Bearer fab6b909db3d24c4a0577894c9d29e6dd83f7c30be4e6e66c68cb31465b4fe0e')
 			.expect('Content-Type', /json/) 			
	 		.expect(200)
 			.end((err, res)=>{
 				//Meditation default			
 				expect(res.body.meditations).to.be.an('array'); 
 				expect(res.body.meditations[0]).to.have.property('id').that.is.a('number').equal(1);
 				expect(res.body.meditations[0]).to.have.property('title').that.is.a('string').equal('Muscle-Tension Release Meditation');
 				expect(res.body.meditations[0]).to.have.property('duration').that.is.a('string').equal('14.25 min'); 
 				expect(res.body.meditations[0]).to.have.property('path').that.is.empty; 

 				done(err);
 			})
 		});

 		it('should return activities default if takes longer than 5000ms to get response from tracking api', (done) =>{
 			request.get('/api/v1/home')
 			.set('Accept', 'application/json')	
 			.timeout(5001)
 			.set('Authorization', 'Bearer fab6b909db3d24c4a0577894c9d29e6dd83f7c30be4e6e66c68cb31465b4fe0e')
 			.expect('Content-Type', /json/) 			
	 		.expect(200)
 			.end((err, res)=>{
 				//Activities default
 				expect(res.body.activities).to.have.property('recent_activities').that.is.an('array');
 				expect(res.body.activities).to.have.property('monthly_activities').that.is.an('array');
 				expect(res.body.activities).to.have.property('classes_taken_this_month').that.is.a('number').equal(0);
 				expect(res.body.activities).to.have.property('classes_taken_this_week').that.is.a('number').equal(0);
 				expect(res.body.activities).to.have.property('classes_taken_this_year').that.is.a('number').equal(0);
 				expect(res.body.activities).to.have.property('minutes_taken_this_month').that.is.a('number').equal(0);
 				expect(res.body.activities).to.have.property('minutes_taken_this_week').that.is.a('number').equal(0);
 				expect(res.body.activities).to.have.property('minutes_taken_this_year').that.is.a('number').equal(0); 
 				done(err);
 			})
 		});

		it('should return user default if takes longer than 10000ms to get response from user api', (done) =>{			
			request.get('/api/v1/home')
 			.set('Accept', 'application/json')	
 			.timeout(10001)
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
 				expect(res.body.meditations[0]).to.have.property('id').that.is.a('number').equal(1);
 				expect(res.body.meditations[0]).to.have.property('title').that.is.a('string').equal('Muscle-Tension Release Meditation');
 				expect(res.body.meditations[0]).to.have.property('duration').that.is.a('string').equal('14.25 min'); 
 				expect(res.body.meditations[0]).to.have.property('path').that.is.empty; 
 				//Workout default
 				expect(res.body.workouts).to.have.lengthOf(4); 			
 				expect(res.body.workouts).to.not.be.empty;
 				expect(res.body.workouts).to.be.an('array');  		
 				expect(res.body.workouts[0]).to.have.property('id').to.be.equal(530); 	
 				expect(res.body.workouts[1]).to.have.property('id').to.be.equal(524); 	
 				expect(res.body.workouts[2]).to.have.property('id').to.be.equal(654); 	
 				expect(res.body.workouts[3]).to.have.property('id').to.be.equal(519);
 				//Favorites default
 				expect(res.body.favorites).to.be.empty; 
 				//Activities default
 				expect(res.body.activities).to.have.property('recent_activities').that.is.an('array');
 				expect(res.body.activities).to.have.property('monthly_activities').that.is.an('array');
 				expect(res.body.activities).to.have.property('classes_taken_this_month').that.is.a('number').equal(0);
 				expect(res.body.activities).to.have.property('classes_taken_this_week').that.is.a('number').equal(0);
 				expect(res.body.activities).to.have.property('classes_taken_this_year').that.is.a('number').equal(0);
 				expect(res.body.activities).to.have.property('minutes_taken_this_month').that.is.a('number').equal(0);
 				expect(res.body.activities).to.have.property('minutes_taken_this_week').that.is.a('number').equal(0);
 				expect(res.body.activities).to.have.property('minutes_taken_this_year').that.is.a('number').equal(0); 				
 				done(err);
 			})
 		})

 		it('should return real user data if token is sent and token is valid and user is not a paid user', (done) => {
 			request.get('/api/v1/home')
 			.set('Accept', 'application/json')	
 			.set('Authorization', 'Bearer fab6b909db3d24c4a0577894c9d29e6dd83f7c30be4e6e66c68cb31465b4fe0e')
 			.expect('Content-Type', /json/)
	 		.expect(200)
 			.end((err, res) => { 				
 				expect(res.body.user).to.not.be.empty;
 				expect(res.body.user.subscriptions).to.be.an('array');

 				expect(res.body.workouts).to.be.an('array'); 
 				expect(res.body.workouts).to.have.lengthOf(4);

 				expect(res.body.banner_image).to.not.be.empty; 
 			
 				expect(res.body.activities).to.have.property('recent_activities').that.is.an('array');
 				expect(res.body.activities).to.have.property('classes_taken_this_month').that.is.a('number');
 				expect(res.body.activities).to.have.property('classes_taken_this_week').that.is.a('number');
 				expect(res.body.activities).to.have.property('classes_taken_this_year').that.is.a('number');
 				expect(res.body.activities).to.have.property('minutes_taken_this_month').that.is.a('number');
 				expect(res.body.activities).to.have.property('minutes_taken_this_week').that.is.a('number');
 				expect(res.body.activities).to.have.property('minutes_taken_this_year').that.is.a('number');

 				
 				expect(res.body.favorites).to.be.empty; 
 				expect(res.body).to.have.length > 0;

 				expect(res.body.meditations).to.be.an('array');  
 				//expect(res.body.meditations[0]).to.have.property('path').that.is.not.empty; 
 				done(err);
 			})
 		})

 		it('should return 401 if token is sent and token is invalid', (done) => {
 			request.get('/api/v1/home')
 			.set('Accept', 'application/json')	
 			.set('Authorization', 'Bearer xxxxxx')
 			.expect('Content-Type', /json/)
	 		.expect(401)
 			.end((err, res) => { 	
 				expect(res.body.message).to.not.be.empty; 			 				
 				done(err);
 			})
 		})

 		it('should return real user data if token is sent and token is valid and user is a paid user', (done) => {
 			request.get('/api/v1/home')
 			.set('Accept', 'application/json')	
 			.set('Authorization', 'Bearer ddd87fb9a543aa0c4d1dd58d55942606dbd5681bfec5311f4077d4b0610380a9')
 			.expect('Content-Type', /json/)
	 		.expect(200)
 			.end((err, res) => { 		
 				//m$, f$, a$, b$, w$, u$
 				expect(res.body.user).to.not.be.empty; 				 				
 				expect(res.body.user.subscriptions).to.be.an('array');

 				expect(res.body.workouts).to.be.an('array'); 
 				expect(res.body.workouts).to.have.lengthOf(4);

 				expect(res.body.banner_image).to.not.be.empty; 

 				expect(res.body.activities).to.have.property('recent_activities').that.is.an('array');
 				expect(res.body.activities).to.have.property('classes_taken_this_month').that.is.a('number');
 				expect(res.body.activities).to.have.property('classes_taken_this_week').that.is.a('number');
 				expect(res.body.activities).to.have.property('classes_taken_this_year').that.is.a('number');
 				expect(res.body.activities).to.have.property('minutes_taken_this_month').that.is.a('number');
 				expect(res.body.activities).to.have.property('minutes_taken_this_week').that.is.a('number');
 				expect(res.body.activities).to.have.property('minutes_taken_this_year').that.is.a('number');

 				
 				expect(res.body.favorites).to.be.empty; 
 				expect(res.body).to.have.length > 0;

 				expect(res.body.meditations).to.be.an('array');  
 				//expect(res.body.meditations[0]).to.have.property('path').that.is.not.empty; 
 				 
 				done(err);
 			})
 		})



 	})
 });

