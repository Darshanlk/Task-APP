const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user");
const { response } = require("../src/app");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mike",
  email: "mike@example.com",
  password: "56what!!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_TOKEN),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Andrew",
      email: "andrew@example.com",
      password: "MyPass777!",
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  except(user).not.toBeNull();


  expect(response.body.user.name).toBe('Andrew')

  expect(response.body).toMatchObject({
    user: {
      name: "Andrew",
      email:"andrew@example.com"
    },
    token:user.tokens[0].token
  })

  expect(user.password).not.toBe('MyPass777!')



});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "thisisnotmypass",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});


test('should delete account for user',async () => {
await request(app).delete('/users/me')
.set("Authorization","Bearer ${userOne.tokens[0].token}")
.send()
.expect(200)

const user = await User.findById(userOneId)
expect(user).toBeNull()

})


test('Should upload avatar image',async () => {

  await request(app)
  .post('/users/me/avatar')
  .set("Authorization",`Bearer ${userOne[0].token}`)
  .attach('avatar','tests/fixtures/profile-pic.jpg')
  .expect(200)

  const user = await User.findById(userOneId)
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test("Should update valid user fields",async () => {

  await request(app)
  .patch('/users/me')
  .set("Authorization",`Bearer ${userOne[0].token}`)
  .send({
    name:"Jess"
  }).expect(200)
const user = await User.findById(userOneId)
expect(user.name).toEqual('Jess')
})







// test('Should not get profile for unauthenticated user', async () => {
//     await request(app)
//         .get('/users/me')
//         .send()
//         .expect(401)
// })

// test('Should delete account for user', async () => {
//     await request(app)
//         .delete('/users/me')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .send()
//         .expect(200)
// })

// test('Should not delete account for unauthenticate user', async () => {
//     await request(app)
//         .delete('/users/me')
//         .send()
//         .expect(401)
// })
