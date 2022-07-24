import express from 'express';
import articlesRoute from './routes/articles.js';
import mongoose from 'mongoose';
import Article from './models/Article.js';
import methodOverride from 'method-override';

const app = express();

mongoose.connect('mongodb://localhost/blogs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articlesRoute)

app.listen(5000)