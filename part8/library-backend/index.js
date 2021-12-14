const { ApolloServer, UserInputError, gql } = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const PASSWORD = process.env.PASSWORD;

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: AuthorInput!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
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
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => {
      const foundAuthor = await Author.findOne({ name: root.name });
      const foundBooks = await Book.find({ author: foundAuthor.id });
      return foundBooks.length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const foundAuthor = await Author.findOne({ name: args.author.name });
      const foundBook = await Book.findOne({ title: args.title });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

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
    editAuthor: async (root, args, context) => {
      const foundAuthor = await Author.findOne({ name: args.name });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      if (!foundAuthor) {
        return null;
      }
      await Author.findOneAndUpdate(
        { name: foundAuthor.name },
        { born: args.setBornTo }
      );
      return await Author.findOne({ name: args.name });
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      try {
        await user.save();
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args.title,
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== PASSWORD) {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
