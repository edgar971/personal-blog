---
title: 'Moving my blog to Gatsby.js'
date: '2018-09-20'
slug: 'moving-my-blog-to-gatsby-js'
---

Today, I decided to move my personal blog from Ghost to Gatsby.js and I love it.
I spent about 30 minutes reading the documentation and decided Gatsby.js was the way to go, especially now with v2 out.
It's built using tools and frameworks I already use like React.js, Node.js, and Prettier. There wasn't much I needed to learn.

### What is Gatsby.js

The Github description says it well:

> Gatsby.js is a Blazing fast modern site generator for React.

It allows developers to create static sites using React with multiple data sources via GraphQL.

Some of the features I like:

1. Performance by default with code splitting, image optimization, and lazy-loading.
1. Multiple data sources. You can pull data from markdown files, REST APIs, and pretty much any other data source. This is all made accessible via GraphQL.
1. Modern and flexible architecture. Gatsby uses React.js and GraphQL at its core that allows developers to create almost any type of website. It also includes Prettier and ESLint to help you follow the best practices and patterns.

### Development Experience

One of the main reasons I decided to use Gatsby.js was for its development experience.
It offers a great CLI to easily bootstrap new projects along with starter templates. I used the Gatsby starter template for creating a blog which had everything I needed out of the box. Prettier and ESLint come pre-installed and configured which is great for code consistency and applying best patterns.

The only thing I needed to do was transfer over my old blog posts from Ghost. That was easy to do since they were already in markdown.

### Useful Links

1. [Gatsby.js](https://www.gatsbyjs.org/)
2. [What is Gatsby.js](https://www.mediacurrent.com/what-is-gatsby.js/)
