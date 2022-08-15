import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log('this is token: ', token)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log('this is config: ', config)
  const request = await axios.post(baseUrl, blogObject, config)
  console.log('this is request.data: ', request)

  return request.data //????
}

const update = async (updateObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.put(
    `${baseUrl}/${updateObject.id}`,
    updateObject,
    config
  )
  return request.data
}

const updateLikes = async (updateBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const postBlog = { ...updateBlog, likes: updateBlog.likes + 1 }
  console.log('postBlog is: ', postBlog)
  const response = await axios.put(
    `${baseUrl}/${updateBlog.id}`,
    postBlog,
    config
  )
  console.log('response.data is: ', response)
  return postBlog
}

const removeBlog = async (removeBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${removeBlog.id}`, config)
  return response.data
}

const addingComment = async (blog, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('G. addingComment, comment is: ', comment)
  const response = await axios.post(
    `${baseUrl}/${blog.id}/comments`,
    { comments: comment },
    config
  )

  return response.data
}

export default {
  getAll,
  setToken,
  create,
  update,
  removeBlog,
  updateLikes,
  addingComment,
}
