import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const noteSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlog(state, action) {
      return action.payload
    }, //for initialising and displaying the multiple blogs. Used in the useeffect.
    //still has trouble dispalying after removing/adding new blocks. please find fix
    increLikes(state, action) {
      const id = action.payload.id //this payload;s likes has already been incremented in the database.
      console.log('action payload is: ', action.payload)

      const filteredBlog = state.filter((n) => n.id !== id)
      const newBlogs = [...filteredBlog, action.payload]
      console.log('newBlogs is: ', newBlogs)

      return newBlogs.sort((a, b) => b.likes - a.likes)
    }, //incre the likes in exisitng blogs
    removeBlog(state, action) {
      //still has the issue where state does not update after removing....
      const id = action.payload.id
      const filteredBlog = state.filter((n) => n.id !== id)
      return filteredBlog.sort((a, b) => b.likes - a.likes)
    },
    AppendBlog(state, action) {
      const content = action.payload
      console.log('this is payload: ', content)
      const appendedBlog = [...state, content]
      console.log('appendedblog is: ', appendedBlog)
      return appendedBlog.sort((a, b) => b.likes - a.likes)
    },
  },
})

export const { setBlog, increLikes, removeBlog, AppendBlog } = noteSlice.actions

export const initializeBlog = () => {
  console.log('initializing...!!!!!!!')
  return async (dispatch) => {
    const blog = await blogService.getAll()
    const sorted = blog.sort((a, b) => b.likes - a.likes)
    dispatch(setBlog(sorted))
  }
}

export const updateLikes = (updateBlog) => {
  console.log('updateBlog is: ', updateBlog)
  return async (dispatch) => {
    const updatedBlog = await blogService.updateLikes(updateBlog)
    console.log('updatedBlog is: ', updatedBlog)
    dispatch(increLikes(updatedBlog))
  }
}

export const removeTheBlog = (blogtoRemove) => {
  return async (dispatch) => {
    const removedBlog = await blogService.removeBlog(blogtoRemove)
    dispatch(removeBlog(removedBlog))
  }
}

export const createBlog = (blogtoCreate) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogtoCreate)
    dispatch(AppendBlog(newBlog))
  }
}

export const createComment = (blog, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.addingComment(blog, comment)
    dispatch(increLikes(newComment)) // I realise that I can just use increLikes instead of creating a new reducer.
  }
}

export default noteSlice.reducer
