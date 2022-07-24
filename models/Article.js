import mongoose from "mongoose";
import marked from "marked";
import slugify from "slugify";
import createDomPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const dompurify = createDomPurify(new JSDOM().window)

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    article: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

ArticleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    if (this.article) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.article))
    }

    next()
})

export default mongoose.model('Article', ArticleSchema);