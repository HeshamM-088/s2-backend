const express = require("express");
const cors = require("cors");
const { get_users, get_user, add_user } = require("./controllers/users");
const { check } = require("./middleware/check");

const PORT = 3000;

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "test",
  });
});

app
  .get("/users", get_users)
  .get("/users/:userId", get_user)
  .post("/users", add_user);

app.listen(PORT, () => {
  console.log(`server runnnig on port ${PORT}`);
});

// module.exports = app;

/*
crud
get all
get single
delete
update
add
*/
