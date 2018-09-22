---
title: 'Heroku 16 Imagemagick Buildpack'
date: '2018-04-08'
path: '/2018/04/08/imagemagick-heroku-buildpack'
---

## Problem

I'm working on a project that requires [imagemagick](https://www.imagemagick.org/script/index.php) to work on the Heroku 16 stack. When using the [buildpack](https://github.com/ello/heroku-buildpack-imagemagick), I get the following error:

```
libgvc.so.6: cannot open shared object file: No such file or directory
```

## Solution

I was able to fix the problem by including the [GraphViz](https://github.com/ello/heroku-buildpack-imagemagick) buildpack. In order to get Imagemagick working on Heroku-16 you need to add the [imagemagick](https://github.com/ello/heroku-buildpack-imagemagick) and [GraphViz](https://github.com/ello/heroku-buildpack-imagemagick) buildpacks to your project.
