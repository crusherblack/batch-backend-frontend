const { Author, Book } = require("../../models");
const book = require("../../models/book");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: {
        model: Author,
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
        through: {
          attributes: [],
        },
      },
      attributes: {
        exclude: ["description", "createdAt", "updatedAt"],
      },
    });

    // cara manual manipulasi object
    // const newBooks = books.map((book) => ({
    //   id: book.id,
    //   title: book.title,
    //   Authors: book.Authors?.map((author) => ({
    //     id: author.id,
    //     name: author.name,
    //   })),
    // }));

    //null colusion

    res.send({
      status: "success",
      message: "Books Successfully Retrieved",
      data: {
        books,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll({
      include: {
        model: Book,
        attributes: {
          exclude: ["createdAt", "updatedAt", "description"],
        },
        through: {
          attributes: [],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      message: "Authors Successfully Retrieved",
      data: {
        authors,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
