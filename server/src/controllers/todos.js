let todos = [
  {
    id: 1,
    title: "Belajar Node.js",
    isDone: true,
  },
  {
    id: 2,
    title: "Belajar Express.js",
    isDone: false,
  },
];

exports.getTodos = (req, res) => {
  res.send({
    message: "Response Success",
    data: {
      todos,
    },
  });
};

exports.addTodo = (req, res) => {
  const todo = req.body;

  todos = [...todos, todo];
  res.send({
    message: "Response Success",
    data: {
      todos,
    },
  });
};

exports.editTodo = (req, res) => {
  const { id } = req.params;
  const editTodo = req.body;

  todos = todos.map((todo) =>
    todo.id == id
      ? {
          title: editTodo.title ? editTodo.title : todo.title,
          isDone: editTodo.isDone ? editTodo.isDone : todo.isDone,
        }
      : todo
  );

  res.send({
    message: "Response Success",
    data: {
      todos,
    },
  });
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;

  todos = todos.filter((todo) => todo.id != id);

  res.send({
    message: "Response Success",
    data: {
      todos,
    },
  });
};
