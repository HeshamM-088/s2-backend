const fs = require("fs/promises");
const path = require("path");

// const data_path = path.join(
//   __dirname.slice(0, __dirname.indexOf("controllers")),
//   "data/users.json"
// );

const data_path = path.join(process.cwd(), "data", "users.json");

const get_users = async (req, res) => {
  const result = await fs.readFile(data_path, "utf-8");
  const users = await JSON.parse(result);

  res.status(200).json({
    status: 200,
    data: { data: users, message: "users fetched success" },
  });
};

const get_user = async (req, res) => {
  const { userId } = req.params;
  const result = await fs.readFile(data_path, "utf-8");
  const { users } = await JSON.parse(result);

  const searched_user = users.find((user) => user.id == userId);

  if (!searched_user) {
    return res.status(404).json({
      status: 404,
      data: { data: null, message: "invalid userId" },
    });
  }

  return res.status(200).json({
    status: 200,
    data: { data: searched_user, message: "user found success" },
  });
};

const add_user = async (req, res) => {
  const { name, dep, salary } = req.body;

  if (!name || !dep || !salary) {
    return res.status(400).json({
      status: 400,
      data: { data: null, message: "invalid user requirements" },
    });
  }

  const result = await fs.readFile(data_path, "utf-8");
  const { users } = await JSON.parse(result);

  const check = users.some((user) => user.name == name);

  if (check) {
    return res.status(400).json({
      status: 400,
      data: { data: null, message: "user already exist" },
    });
  }

  users.push({ id: `${users.length + 1}`, name, dep, salary });

  await fs.writeFile(data_path, JSON.stringify({ users }), "utf-8");

  return res.status(201).json({
    status: 201,
    data: {
      data: { id: users.length, name, dep, salary },
      message: "user added success",
    },
  });
};

module.exports = {
  get_users,
  get_user,
  add_user,
};
