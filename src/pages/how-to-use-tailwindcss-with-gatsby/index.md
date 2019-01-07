---
title: 'How To Use Tailwind CSS With Gatsby'
date: '2019-01-05'
---

I'm in the process of updating the design of this blog. I decided to use [Tailwind](https://tailwindcss.com/), A utility-first CSS framework. It's an awesome framework, I encourage you to check it out. In this post, we are going to cover how to use Tailwind with Gatsby.

## Install Required NPM Packages

Let's first install the following NPM packages:

```bash
yarn add -D tailwindcss postcss-preset-env gatsby-plugin-postcss
```

## Configure Tailwind

Let's generate a Tailwind config file by running the following command:

```bash
yarn tailwind init
```

This should generate a `tailwind.js` file at the root of your project. This is where you can customize
Tailwind specifically for your project.

## Configure PostCSS

Let's now create the PostCSS config file. Create a `postcss.config.js` with the following config:

```js
const postcssPresetEnv = require(`postcss-preset-env`)
const tailwindcss = require('tailwindcss')

module.exports = () => ({
  plugins: [
    tailwindcss('./tailwind.js'),
    postcssPresetEnv({
      stage: 0,
    }),
  ],
})
```

This is the file is automatically read by the Gatsby PostCSS plugin(`gatsby-plugin-postcss`) we installed earlier.

## Update Your Main CSS File

Require the Tailwind CSS in your main CSS file. In my case, I added the following code to my `src/styles/main.css` file:

```css
@tailwind preflight;
@tailwind utilities;
```

This is the file I have required in the `gatsby-browser.js` file.

> Note: It might be in a different path for you.

## That's it

You should have Tailwind CSS working properly on your Gatsby site. Feel free to [check out the source code](https://gitlab.com/edgarpino/personal-blog) of this site for reference.
