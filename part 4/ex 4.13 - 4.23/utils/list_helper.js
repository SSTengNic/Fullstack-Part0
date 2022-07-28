
const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return (
    blogs.reduce((prev,curr) => {
      return prev + curr.likes
    },0)
  )
}



const favoriteBlog =(blogs) => {
  var highest =0
  var favObject = new Object()
 
  blogs.map((blog) => {
    if (blog.likes >highest) {
      favObject = blog
      highest = blog.likes
    }
  })
  return favObject
}

const mostBlogs = (blogs)=> {
  var first = (lodash.countBy(blogs,'author'))
  const mostBlogs = lodash.max(Object.values(first))
  const author = Object.keys(first).find(key => first[key] === mostBlogs)
  const final = {
    author: author,
    blogs: mostBlogs
  }
  return final
}

const mostLikes = (blogs) => {
  const condensed = blogs.reduce((incre, curr) => {
    incre[curr.author] = (incre[curr.author] || 0) + curr.likes

    return incre
  }, {})
  const mostLikes = Math.max(...Object.values(condensed))
  const author = Object.keys(condensed).find(key => condensed[key] === mostLikes)
  const final = {
    author: author,
    likes: mostLikes
  }
  return final
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}