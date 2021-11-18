const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((a, b) => (a.likes > b.likes ? a : b));
};

const mostBlogs = (blogs) => {
  const authorBlogs = blogs.reduce((a, { author }) => {
    a[author] = a[author] || 0;
    a[author] += 1;
    return a;
  }, {});
  let author,
    cnt = 0;
  for (const [key, value] of Object.entries(authorBlogs)) {
    if (cnt < value) {
      author = key;
      cnt = value;
    }
  }
  return { author: author, blogs: cnt };
};

const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((a, { author, likes }) => {
    a[author] = a[author] || 0;
    a[author] += likes;
    return a;
  }, {});
  let author,
    cnt = 0;
  for (const [key, value] of Object.entries(authorLikes)) {
    if (cnt < value) {
      author = key;
      cnt = value;
    }
  }
  return { author: author, likes: cnt };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
