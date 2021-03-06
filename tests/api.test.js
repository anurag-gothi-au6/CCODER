process.env.NODE_ENV = 'test'
const request = require('supertest')
const api = require('../app')
const db = require('../db')
let user;
let challenge;
let testcase;
let contest;
let contestChallenge;
beforeAll(() => {
  db.connect
});
afterAll(() => {
  db.disconnect()
});

describe('Register user And Login', () => {
  test('should post a Accept response of POST /user/register ', function (done) {
    request(api)
      .post('/user/register')
      .send({
        name: "anurag gothi",
        username: "anuraggothi",
        email: "anuraggothi40@gmail.com",
        password: "Anurag@123"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        user = res.body.createUser
        console.log(user.accessToken)
        if (err) return done(err);
        done();
      });
  })
  test('should post a Accept response of POST /user/login ', function (done) {
    request(api)
      .post('/user/login')
      .send({

        email: user.email,
        password: user.password
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        user = res.body.loginUser
        if (err) return done(err);
        done();
      });
  })
})

// Admin Challenge Routes  Unit Testing
describe('Challenge Creation with testcases', () => {
test('should post a response rejecting of POST /admin/challenge ',function(done){
    request(api)
      .post('/admin/challenge/')
      .send({
        decription:"add",
        question:"abcdec",
        output:"15",
        input:"5,10",
        func_name:"add",
        no_of_args:2,
        editorial:"print(a+b)",
        maxScore:40
    })
      .set('Accept', 'application/json')
      .expect('Content-Type', "text/html; charset=utf-8")
      .expect(422)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
})
test('should post a Accept response of POST /admin/challenge ',function(done){
    request(api)
      .post('/admin/challenge')
      .send({
        name:"Anurag",
        decription:"add",
        question:"abcdec",
        output:"15",
        input:"5,10",
        func_name:"add",
        no_of_args:2,
        editorial:"print(a+b)",
        maxScore:40,
        constraints: "ab"
    })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        console.log(user)
        challenge = res.body.challenge
        if (err) return done(err);
        done();
      });
})
test('should post a Accept response of POST /testcase/:challenge',function(done){
  request(api)
    .post(`/admin/testcase/${challenge.name}`)
    .send({
      result:"15",
      input:"5,10"
  })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
})
test('should post a Error response of POST /testcase/:challenge ',function(done){
  request(api)
    .post('/admin/testcase/aanurag')
    .send({
      result:"15",
      input:"5,10"
  })
    .set('Accept', 'application/json')
    .expect('Content-Type', "text/html; charset=utf-8")
    .expect(404)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
})
})

// User Challenge Routes Unit Testing
describe('Challenge Creation with testcases', () => {
  test('should post a response rejecting of POST /user/challenge/:token',function(done){
      request(api)
        .post(`/user/challenge/${user.accessToken}`)
        .send({
          decription:"add",
          question:"abcdec",
          output:"15",
          input:"5,10",
          func_name:"add",
          no_of_args:2,
          editorial:"print(a+b)",
          maxScore:40
      })
        .set('Accept', 'application/json')
        .expect('Content-Type', "text/html; charset=utf-8")
        .expect(422)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
  })
  test('should post a Accept response of POST /user/challenge/:token ',function(done){
      request(api)
        .post(`/user/challenge/${user.accessToken}`)
        .send({
          name:"First",
          decription:"add",
          question:"abcdec",
          output:"15",
          input:"5,10",
          func_name:"add",
          no_of_args:2,
          editorial:"print(a+b)",
          maxScore:40,
          constraints: "ab"
      })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          challenge = res.body.challenge
          console.log(challenge.name)
          if (err) return done(err);
          done();
        });
  })
  test('should post a Accept response of POST /testcase/:challenge/:token',function(done){
    request(api)
      .post(`/testcase/${challenge.name}/${user.accessToken}`)
      .send({
        result:"15",
        input:"5,10"
    })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  })
  test('should post a Error response of POST /testcase/:challenge/:token ',function(done){
    request(api)
      .post(`/testcase/aanurag/${user.accessToken}`)
      .send({
        result:"15",
        input:"5,10"
    })
      .set('Accept', 'application/json')
      .expect('Content-Type', "text/html; charset=utf-8")
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  })

  test('should post a Error response of POST /testcase/:challenge/:token ',function(done){
    request(api)
      .post(`/testcase/${challenge.name}/${user.accessToken}`)
      .send({
        //result:"15",
        input:"5,10"
    })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  })

 test('should post a Accept response of POST /:challenge/discussion/:token',function(done){
    request(api)
      .post(`/${challenge.name}/discussion/${user.accessToken}`)
      .send({
        text:"hello"
    })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  })

  test('should post a Error response of POST /:challenge/discussion/:token',function(done){
    request(api)
      .post(`/aanurag/discussion/${user.accessToken}`)
      .send({
        text:"hello"
    })
      .set('Accept', 'application/json')
      .expect('Content-Type', "text/html; charset=utf-8")
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  })

  test('should post a Error response of POST /:challenge/discussion/:token',function(done){
    request(api)
      .post(`/${challenge.name}/discussion/${user.accessToken}`)
      .send({
        
    })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  })

  test('should post a Accept response of POST /:challenge/bookmark/add/:token',function(done){
    request(api)
      .post(`/${challenge.name}/bookmark/add/${user.accessToken}`)
      .send({
    })
      .set('Accept', 'application/json')
      .expect('Content-Type', "text/html; charset=utf-8")
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  })

  test('should post a Error response of POST /:challenge/bookmark/add/:token',function(done){
    request(api)
      .post(`/aanurag/bookmark/add/${user.accessToken}`)
      .send({
    })
      .set('Accept', 'application/json')
      .expect('Content-Type', "text/html; charset=utf-8")
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  })

  test('should post a Error response of POST /:challenge/bookmark/add/:token',function(done){
    request(api)
      .post(`/${challenge.name}/bookmark/add/${user.accessToken}`)
      .send({
    })
      .set('Accept', 'application/json')
      .expect('Content-Type', "text/html; charset=utf-8")
      .expect(409)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  })

test('should post a Accept response of POST /submit/:challenge/:token',function(done){
  request(api)
    .post(`/submit/${challenge.name}/${user.accessToken}`)
    .send({
      language:"node",
      code:"function add(a,b) {console.log(a+b)}"
  })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
})

test('should post a Error response of POST /submit/:challenge/:token',function(done){
  request(api)
    .post(`/submit/${challenge.name}/${user.accessToken}`)
    .send({
      language:"node",
      //code:"function add(a,b) {console.log(a+b)}"
  })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(422)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
})

test('should post a Error response of POST /submit/:challenge/:token',function(done){
  request(api)
    .post(`/submit/aanurag/${user.accessToken}`)
    .send({
      language:"node",
      code:"function add(a,b) {console.log(a+b)}"
  })
    .set('Accept', 'application/json')
    .expect('Content-Type', "text/html; charset=utf-8")
    .expect(404)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
})

test('should post a Accept response of GET /leaderboard/:challenge/:token',function(done){
  request(api)
    .get(`/leaderboard/${challenge.name}/${user.accessToken}`)
    .send({
  })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
})

test('should post a Error response of POST /leaderboard/:challenge/:token',function(done){
  request(api)
    .get(`/leaderboard/aanurag/${user.accessToken}`)
    .send({
  })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(404)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
})

  
  })

//  Contest Unit Testing

describe('Contest Creation with Adding Moderator signups and Adding Challenges', () => {
  test('should post a Accept response of POST /contest/new/:token"', function (done) {
    request(api)
      .post(`/contest/new/${user.accessToken}`)
      .send({
        name: "hacker",
        startTime:"2020-04-15T16:00:00",
	      endTime:"2020-04-16T20:30:00",
        organizationName: "CCoder",
        organizationType: "startup",
        scoring: 400,
        tagline: "test",
        description: "test contest",
        prizes: "200k",
        rules: "Open for all"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        contest = res.body.contest
        if (err) return done(err);
        done();
      });
  })
  test('should post a Error response of POST /contest/new/:token"', function (done) {
    request(api)
      .post(`/contest/new/${user.accessToken}`)
      .send({
        name: "hacker",
        startTime:"2020-04-15T16:00:00",
	      endTime:"2020-04-16T20:30:00",
        organizationName: "CCoder",
        organizationType: "startup",
        scoring: 400,
        tagline: "test",
        description: "test contest",
        prizes: "200k",
        rules: "Open for all"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', "text/html; charset=utf-8")
      .expect(409)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  })
  test('should post a Accept response of POST /contest/:contest/addchallenge/:challenge/:token"', function (done) {
    request(api)
      .post(`/contest/${contest.name}/addchallenge/${challenge.name}/${user.accessToken}`)
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  })
  test('should post a Error response of POST /contest/:contest/addchallenge/:challenge/:token"', function (done) {
    request(api)
      .post(`/contest/${contest.name}/addchallenge/enej/${user.accessToken}`)
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  })
  test('should post a  Accept response of POST /contest/:contest/addmoderator/:username/:token"', function (done) {
    request(api)
      .post(`/contest/${contest.name}/addmoderator/${user.username}/${user.accessToken}`)
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  })
  test('should post a Error response of POST /contest/:contest/addmoderator/:username/:token"', function (done) {
    request(api)
      .post(`/contest/${contest.name}/addmoderator/${user.username}/${user.accessToken}`)
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  })
  test('should post a Accept response of POST /contest/:contest/signup/:token', function (done) {
    request(api)
      .post(`/contest/${contest.name}/signup/${user.accessToken}`)
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  })
  test('should post a Error response of POST /contest/:contest/signup/:token', function (done) {
    request(api)
    .post(`/contest/${contest.name}/signup/${user.accessToken}`)
    .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  })
})