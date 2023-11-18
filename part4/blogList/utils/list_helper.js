const _ = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const sumOfLikes = blogs.reduce((acc, curVal) => acc + curVal.likes, 0);

  return sumOfLikes;
};

const favouriteBlog = (blogs) => {
  const result = {};
  let maxLikes = 0;
  blogs.forEach((blog) => {
    if (maxLikes < blog.likes) {
      maxLikes = blog.likes;
      result.title = blog.title;
      result.author = blog.author;
      result.likes = blog.likes;
    }
  });

  return result;
};

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  const authorCount = _.countBy(authors);

  const maxValKey = _.maxBy(_.keys(authorCount), (key) => authorCount[key]);

  return {
    author: maxValKey,
    blogs: authorCount[maxValKey],
  };
};

const mostLikes = (blogs) => {
  const likesCounter = {};
  blogs.forEach((blog) => {
    if (Object.prototype.hasOwnProperty.call(likesCounter, blog.author)) {
      likesCounter[blog.author] += blog.likes;
    } else {
      likesCounter[blog.author] = blog.likes;
    }
  });
  // eslint-disable-next-line max-len
  const keyWithMostLikes = Object.keys(likesCounter).reduce((maxKey, key) => (likesCounter[key] > likesCounter[maxKey] ? key : maxKey), Object.keys(likesCounter)[0]);

  return {
    author: keyWithMostLikes,
    likes: likesCounter[keyWithMostLikes],
  };
};

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes,
};
