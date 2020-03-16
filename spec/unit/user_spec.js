const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {

  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("#create()", () => {
    it("should create a User", (done) => {
      User.create({
        name: "Eddie",
        email: "eddie@mail.com",
        password: "abc1234"
      })
      .then((user) => {
        expect(user.name).toBe("Eddie"),
        expect(user.email).toBe("eddie@mail.com");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a user with invalid password", (done) => {
      User.create({
        name: "Eddie",
        email: "eddie",
        password: "1234abc"
      })
      .then((user) => {

        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      });
    });

    it("should not create a user with an email that has already been used", (done) => {
      User.create({
        name: "Barry",
        email: "bonds@giants.com",
        password: "homerun"
      })
      .then((user) => {

        User.create({
          name: "Jose",
          email: "bonds@giants.com",
          password: "canseco"
        })
        .then((user) => {

          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Validation error");
          done();
        });

        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

});