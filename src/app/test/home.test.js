
 describe('Home API Route Integration Tests', function(){

 	beforeEach((done)=>{
 		done();
 	});

 	describe('GET /home ', () =>{

 		it('returns home default data if token is not sent', (done) => {
 			request.get('/api/v1/home')
 			.set('Accept', 'application/json')
 			.expect('Content-Type', /json/)
	 		.expect(200)
 			.end((err, res) => { 				
 				expect(res.body.banner_image).to.not.be.empty; 
 				expect(res.body.user).to.not.be.empty;
 				expect(res.body.user.id).to.be.equal(0);
 				expect(res.body.user.name).to.be.equal('Hello');
 				expect(res.body.meditations).to.be.an('array'); 
 				expect(res.body.meditations[0].path).to.be.empty; 
 				expect(res.body.workouts).to.be.an('array'); 
 				expect(res.body.workouts).to.have.lengthOf(4);
 				expect(res.body.favorites).to.be.empty; 
 				expect(res.body.activities).to.be.empty; 
 				expect(res.body).to.have.length > 0;
 				done(err);
 			})
 		})

 		it('returns real user data if token is sent and token is valid and user is not a unpaid user', (done) => {
 			request.get('/api/v1/home')
 			.set('Accept', 'application/json')	
 			.set('Authorization', 'Bearer fab6b909db3d24c4a0577894c9d29e6dd83f7c30be4e6e66c68cb31465b4fe0e')
 			.expect('Content-Type', /json/)
	 		.expect(200)
 			.end((err, res) => { 				
 				expect(res.body.banner_image).to.not.be.empty; 
 				expect(res.body.user).to.not.be.empty;
 				expect(res.body.user.id).to.be.above(0); 				
 				expect(res.body.meditations).to.be.an('array'); 
 				expect(res.body.meditations[0].path).to.be.empty;  	
 				expect(res.body.workouts).to.be.an('array'); 
 				expect(res.body.workouts).to.have.lengthOf(4);
 				expect(res.body.favorites).to.be.empty; 
 				expect(res.body.activities).to.be.empty; 
 				expect(res.body).to.have.length > 0;
 				done(err);
 			})
 		})

 		it('returns 401 if token is sent and token is invalid', (done) => {
 			request.get('/api/v1/home')
 			.set('Accept', 'application/json')	
 			.set('Authorization', 'Bearer xxxxxx')
 			.expect('Content-Type', /json/)
	 		.expect(401)
 			.end((err, res) => { 				 				
 				done(err);
 			})
 		})

 		it('returns real user data if token is sent and token is valid and user is not a paid user', (done) => {
 			request.get('/api/v1/home')
 			.set('Accept', 'application/json')	
 			.set('Authorization', 'Bearer ddd87fb9a543aa0c4d1dd58d55942606dbd5681bfec5311f4077d4b0610380a9')
 			.expect('Content-Type', /json/)
	 		.expect(200)
 			.end((err, res) => { 				
 				expect(res.body.banner_image).to.not.be.empty; 
 				expect(res.body.user).to.not.be.empty;
 				expect(res.body.user.id).to.be.above(0); 				
 				expect(res.body.meditations).to.be.an('array');  
 				expect(res.body.meditations[0].path).to.not.be.empty; 	
 				expect(res.body.workouts).to.be.an('array'); 
 				expect(res.body.workouts).to.have.lengthOf(4);
 				expect(res.body.favorites).to.be.empty; 
 				expect(res.body.activities).to.be.empty; 
 				expect(res.body).to.have.length > 0;
 				done(err);
 			})
 		})



 	})
 });

