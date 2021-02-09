const { Post } = require("../../models");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.send({
      status: "success",
      message: "Posts Successfully Retrieved",
      data: {
        posts,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getPostsById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      return res.status(400).send({
        status: "failed",
        message: `Post with id ${id} Not Existed`,
      });
    }

    res.send({
      status: "success",
      message: `Post with id ${id} Successfully Retrieved`,
      data: {
        post,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.addPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);

    res.send({
      message: "Posts Successfully Created",
      data: {
        post,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.addPostWithImage = async (req, res) => {
  const { files } = req;

  const { title, description } = req.body;

  try {
    const post = await Post.create({
      title,
      description,
      thumbnail: files.thumbnail[0].filename,
      epubFile: files.epubFile[0].filename,
    });

    res.send({
      message: "Posts Successfully Created",
      data: {
        post,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.editPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      return res.send({
        message: `Post with id ${id} Not Existed`,
      });
    }

    await Post.update(req.body, {
      where: {
        id,
      },
    });

    const postUpdated = await Post.findOne({
      where: {
        id,
      },
    });

    res.send({
      message: `Posts with id ${id} Successfully Updated`,
      data: {
        post: postUpdated,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await Post.destroy({
      where: {
        id,
      },
    });

    res.send({
      message: `Posts with id ${id} Successfully Deleted`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.functionName = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
