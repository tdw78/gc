const request = require("request");
const server = require("../../server");
const base = "http://localhost:5000";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {
  beforeEach(done => {
    sequelize
      .sync({ force: true })
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  describe("POST /api/signup", () => {
    it("should create a new user", (done) => {
      const options = {
        url: `${base}/api/signup`,
        form: {
          name: "Jonny",
          email: "jonny@mail.com",
          password: "1234abc"
        }
      };

      request.post(options, (err, res, body) => {

        User.findOne({ where: { name: "Jonny" } })
          .then((user) => {
            expect(user).not.toBeNull();
            expect(user.email).toBe("jonny@mail.com");
            expect(user.id).toBe(1);
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
      });
    });

    it("should create hashed password", (done) => {
      const options = {
        url: `${base}/api/signup`,
        form: {
          name: "Jonny",
          email: "jonny@mail.com",
          password: "1234abc"
        }
      };

      request.post(options, (err, res, body) => {
        User.findOne({ where: { name: "Jonny" } })
          .then((user) => {
            expect(user).not.toBeNull();
            expect(user.email).toBe("jonny@mail.com");
            expect(user.id).toBe(1);
            expect(user.password).not.toBe("1234abc");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
      });
    });

    it("should not create a new user with invalid entries", (done) => {
      request.post(
        {
          url: `${base}/api/signup`,
          form: {
            name: "Jonny",
            email: "jonny",
            password: "1234abc"
          }
        },
        (err, res, body) => {
          User.findOne({ where: { email: "jonny" } })
            .then((user) => {
              expect(user).toBeNull();
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
        }
      );
    });
  });

});