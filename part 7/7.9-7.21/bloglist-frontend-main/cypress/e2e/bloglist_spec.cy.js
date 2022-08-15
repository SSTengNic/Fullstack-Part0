describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Nicholas Teng',
      username: 'Soulen00',
      password: '12345'
    }
    cy.request('POST','http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function () {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#login-username').type('Soulen00')
      cy.get('#login-password').type('12345')
      cy.get('#login-button').click()

      cy.contains('Nicholas Teng has logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#login-username').type('Soulen00')
      cy.get('#login-password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong Credentials')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({
        username: 'Soulen00',
        password: '12345'
      })
    })

    it('A blog can be created, liked and deleted',function () {
      cy.contains('new note').click()
      cy.get('#Title').type('New Blog')
      cy.get('#Author').type('New Author')
      cy.get('#Url').type('New Url')
      cy.contains('create form').click()

      cy.contains('New Blog New Author')
      //checking liked
      cy.contains('view').click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
      //checking delete
      cy.get('#delete-button').click()
      cy.contains('New Blog has been removed.')
    })

    describe('For checking sequence', function () {
      beforeEach(function(){
        cy.createBlog({
          title: 'The title with the second most likes',
          author: 'New Author 1',
          url: 'New Url 1',
          likes: 10
        })
        cy.createBlog({
          title: 'The title with the the most likes',
          author: 'New Author 2',
          url: 'New Url 2',
          likes: 20
        })
      })
      it.only('checks sequence change of blogs',function() {
        cy.contains('view').click()
       
      })
    })
  })
})