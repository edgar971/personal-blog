---
title: 'Resizing Images In Elixir with Mogrify'
date: '2018-04-08'
slug: '/2018/04/08/resizing-images-in-elixir'
---

I've been working on a simple Elixir and Phoenix web app that [extracts text found in images](https://image-to-text.edgardev.com/) and I ran into a problem, people were uploading large images. I only needed images that were around 1200x1200 pixels.

I did some Googling around and I stumbled across [Mogrify](https://github.com/route/mogrify), a simple Elixir library to process images. Under the hood it uses [ImageMagick](https://www.imagemagick.org/script/index.php), a commandline tool for displaying, converting, and editing raster image and vector image files.

## Using Mogrify

Mogrify is simple and easy to use and the only requirement is to have ImageMagick installed on your computer. See [installation instructions](https://www.imagemagick.org/script/install-source.php) for more info.

1. Add `{:mogrify, "~> 0.5.6"}` to your `mix.exs` file and run `mix deps.get`.
1. Import it on the module you intend to use it on. Here's how my module looks like:

   ```elixir
   defmodule ImgToTxt.Utils.Image do
     import Mogrify

     @doc """
     Resize images given imagePath, width, height, and optional Mogrify opts
     """
     def resize(imagePath, width, height, opts \\ []) do
       # Continue reading
     end
   end
   ```

1. To resize images you first `open` the file by give it the path to the image. When calling `open`, it should return something like:

   ```bash
   iex(3)> Mogrify.open("test/assets/test.png")
   %Mogrify.Image{
     animated: false,
     dirty: %{},
     ext: ".png",
     format: nil,
     frame_count: 1,
     height: nil,
     operations: [],
     slug: "img_to_txt/test/assets/test.png",
     width: nil
   }
   ```

   Now, let's add that to our function

   ```elixir
   def resize(imagePath, width, height, opts \\ []) do
       open(imagePath)
   end
   ```

1. Now that we have our file opened, let's resize it. Mogrify provides the following functions to resize images: [`resize`](https://hexdocs.pm/mogrify/Mogrify.html#resize/2), [`resize_to_fill`](https://hexdocs.pm/mogrify/Mogrify.html#resize_to_fill/2), and [`resize_to_limit`](https://hexdocs.pm/mogrify/Mogrify.html#resize_to_limit/2). I choose the `resize_to_limit` because it will resize the image to fit within the specified dimensions while retaining the original aspect ratio. It will also only resize the image if it is larger than the specified dimensions. Let's add that to our function:
   ```elixir
   def resize(imagePath, width, height, opts \\ []) do
       open(imagePath)
       |> resize_to_limit(~s(#{width}x#{height}))
   end
   ```
1. The last thing is to save our resized image by using the `save` function. Mogrify will save the image on a temporary file. You can change that by passing in the `path` as an option. See [docs](https://hexdocs.pm/mogrify/Mogrify.html#save/2) for more info. Lets add that to our function:
   ```elixir
   def resize(imagePath, width, height, opts \\ []) do
      open(imagePath)
      |> resize_to_limit(~s(#{width}x#{height}))
      |> save(opts)
   end
   ```

We are done, I hope this was helpful and feel free to comment.
