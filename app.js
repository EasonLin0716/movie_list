const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
// require movie data here
const movieList = require('./movies.json')

// setting template engine
// layout's handlebars would have to be named as 'main.handlebars'
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))


// res.render 的意思，是指 Express 會「回傳 HTML 來呈現前端樣板」。
app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results });
})

app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', { movie: movie })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { movies: movies })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})