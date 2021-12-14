const { ApolloServer, UserInputError, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error("error connecting to MongoDB:", err.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  input AuthorInput {
    name: String!
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: AuthorInput!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author });
        if (foundAuthor) {
          if (args.genres) {
            return await Book.find({
              author: foundAuthor,
              genres: { $in: [args.genres] },
            }).populate("author");
          }
          return await Book.find({ author: foundAuthor }).populate("author");
        }
        return null;
      }
      if (args.genres) {
        return await Book.find({ genres: { $in: [args.genres] } }).populate(
          "author"
        );
      }
      return Book.find({}).populate("author");
    },
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      const foundAuthor = await Author.findOne({ name: root.name });
      const foundBooks = await Book.find({ author: foundAuthor.id });
      return foundBooks.length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.author.name });
      const foundBook = await Book.findOne({ title: args.title });

      if (foundBook) {
        throw new UserInputError("Title must be unique", {
          invalidArgs: args.title,
        });
      }

      if (!foundAuthor) {
        const newAuthor = new Author({ ...args.author });
        try {
          await newAuthor.save();
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args.title,
          });
        }
      }

      const foundAuthor2 = await Author.findOne({ name: args.author.name });
      const newBook = new Book({ ...args, author: foundAuthor2 });
      try {
        await newBook.save();
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args.title,
        });
      }
      return newBook;
    },
    editAuthor: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.name });
      if (!foundAuthor) {
        return null;
      }
      await Author.findOneAndUpdate(
        { name: foundAuthor.name },
        { born: args.setBornTo }
      );
      return await Author.findOne({ name: args.name });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
