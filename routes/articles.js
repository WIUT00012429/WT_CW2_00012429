const express = require('express')
const router = express.Router()
const { writeFile, getFile } = require('../helpers')

router.get('/new', async (req, res) => {
  res.render('pages/new', { article: {} })
})

router.post('/create', async (req, res) => {
  const data = await getFile();
  const newArticle = {
    id: data.data.length + 1,
    title: req.body.title,
    description: req.body.description
  }
  writeFile({
    data: [...data.data, newArticle]
  })
  res.redirect("/")
})

router.get('/edit/:id', async (req, res) => {
  const data = await getFile();
  const byId = data.data.find(post => {
    return post.id == req.params.id
  });
  res.render('pages/edit', { article: byId })
})

router.post('/update/:id', async (req, res, next) => {
  const data = await getFile()
  console.log("pramas", req.params)
  const article = data.data.find(post => post.id == req.params.id)
  req.article = article
  console.log(article, "article")
  next()
}, saveArticleAndRedirect('/edit'))

router.post('/delete/:id', async (req, res) => {
  const data = await getFile();
  const filtered = data.data.filter(post => {
    return post.id != req.params.id
  });

  writeFile({
    data: filtered
  })
  res.redirect("/")
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    try {
      const data = await getFile();
      writeFile({
        data: data.data.map(post => {
          if (post.id == req.params.id) {
            return article
          }
          return post
        }
        )
      })
      res.redirect("/")
    } catch (e) {
      console.log(e, "error")
      res.render(`pages/${path}`, { article: article })
    }
  }
}

module.exports = router