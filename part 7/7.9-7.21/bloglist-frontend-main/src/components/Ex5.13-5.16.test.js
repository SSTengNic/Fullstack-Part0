import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen  } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Printservice from './PrintBlogs'
import BlogForm from './BlogForm'

describe ('blog test', () => {
  const blog = {
    title: 'testing for blog',
    author: 'luke skywalker',
    url: 'url is here',
    likes: 20
  }

  let mockUpdateBlog = jest.fn()
  let mockDeleteBlog = jest.fn()

  test ('only render title and author', () => {
    render (
      <Printservice.Blog blog = {blog} UpdateBlog = {mockUpdateBlog} removeBlog = {mockDeleteBlog}/>
    )
    const element = screen.getByText('testing for blog luke skywalker')
    expect(element).toBeDefined()

  })

  test ('render for url and likes', async () => {
    const { container } = render (
      <Printservice.Blog blog = {blog} UpdateBlog = {mockUpdateBlog} removeBlog = {mockDeleteBlog}/>
    )

    const user = userEvent.setup()

    const button = screen.getByText('view')
    await user.click(button)


    const div = container.querySelector('.blogpost')
    expect(div).toHaveTextContent('url is here')
    expect(div).toHaveTextContent('20')
  })

  test ('like button reflects handler calls', async () => {
    render (
      <Printservice.Blog blog = {blog} UpdateBlog = {mockUpdateBlog} removeBlog = {mockDeleteBlog}/>
    )

    const user = userEvent.setup()
    const button1 = screen.getByText('view')
    await user.click(button1)

    const button2 = screen.getByText('like')
    await user.click(button2)
    await user.click(button2)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })

  test ('testing event handlers for creating new blogs', async () => {
    const mockCreateBlog = jest.fn()
    const mockSuccessMessage = jest.fn()
    const mockErrorMessage = jest.fn()

    render(
      <BlogForm createBlog={mockCreateBlog} setSuccessMessage = {mockSuccessMessage} setErrorMessage = {mockErrorMessage}/>
    )
    const user = userEvent.setup()

    const Titleinput = screen.getByPlaceholderText('Title')
    await user.type(Titleinput, 'This is Title')

    const Authorinput = screen.getByPlaceholderText('Author')
    await user.type(Authorinput, 'This is Author')

    const Urlinput = screen.getByPlaceholderText('Url')
    await user.type(Urlinput, 'This is Url')

    const button = screen.getByText('create form')
    await user.click(button)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('This is Title')
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('This is Author')
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('This is Url')
  })

})