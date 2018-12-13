---
title: 'Getting Started with Ecto Part 3: CRUD Operations'
date: '2018-12-12'
---

Welcome to part three of Getting Started with Ecto. On the [last post](/getting-started-with-ecto-part-2/), we covered how to create migrations, schemas, and changesets. In this post, we will cover how to run CRUD operations against our Postgres database using Ecto.

## Ecto is not an ORM

If you come from Ruby on Rails or .Net then you might be familiar with Active Record or Entity framework. You might be used to doing something like `user.Save()` or `User.Find()`. These and many frameworks follow the Active Record design pattern which is an approach of accessing data in a database. One of the major drawbacks of this pattern is that your domain is usually tightly coupled to a certain persistence layer.

Ecto follows the Repository design pattern which is an abstraction of the data layer and a way of centralizing the handling of the domain objects. In Ecto, queries are done using the `Ecto.Query` DSL against our repository (`GettingStartedWithEcto.Repo`).

I highly suggest reading [this article to learn more about the repository pattern](https://deviq.com/repository-pattern/).

Okay, let's move on to creating records.

## Creating Records

The first thing we are going to create a challenge. Check out the [database design in part 2](getting-started-with-ecto-part-2/) for reference.

Let's define the `Challenges` module inside `getting_started_with_ecto/challenges/challenges.ex`. Inside of that module, we will define a function called `create_challenge` that takes one argument with a map as the default. In this function, we will validate the data via the changeset and insert it to the database. Here's how that looks like:

```elixir
defmodule GettingStartedWithEcto.Challenges do
  alias GettingStartedWithEcto.Challenges.Challenge
  alias GettingStartedWithEcto.Repo

  def create_challenge(attrs \\ %{}) do
    %Challenge{}
    |> Challenge.changeset(attrs)
    |> Repo.insert()
  end
end
```

In this case, the [`Repo.insert`](https://hexdocs.pm/ecto/Ecto.Repo.html#c:insert/2) function takes a `changeset`. It also takes other options like:

- `:returning` for selecting which fields to return. It will return the fields the struct by default.
- `:on_conflict` to specify an alternative action of raising an error. We will use this one later on for upserts.

See the official docs for more [options](https://hexdocs.pm/ecto/Ecto.Repo.html#c:insert/2-options).

You can also use the [`Repo.insert!`](https://hexdocs.pm/ecto/Ecto.Repo.html#c:insert!/2) function which is similar to [`Repo.insert`](https://hexdocs.pm/ecto/Ecto.Repo.html#c:insert/2) which will raise if the changeset is invalid or an error happens.

Okay, let's try inserting a Challenge using the function we just created.

```elixir
%{
  title: "Best Challenge Ever",
  description: "An example description",
  level: "easy"
} |> GettingStartedWithEcto.Challenges.create_challenge
```

It should return the following tuple:

```elixir
{:ok,
 %GettingStartedWithEcto.Challenges.Challenge{
   __meta__: #Ecto.Schema.Metadata<:loaded, "challenges">,
   description: "An example description",
   id: 4,
   inserted_at: ~N[2018-12-07 19:46:50],
   level: "easy",
   solutions: #Ecto.Association.NotLoaded<association :solutions is not loaded>,
   title: "Best Challenge Ever",
   updated_at: ~N[2018-12-07 19:46:50]
 }}
```

Make note of that `Ecto.Association.NotLoaded` message. We will go over that later.

Here are other functions Ecto provides out of the box to insert records:

- [`Repo.insert_all`](https://hexdocs.pm/ecto/Ecto.Repo.html#c:insert_all/3) for inserting many entries into the repository.
- [`Repo.insert_or_update`](https://hexdocs.pm/ecto/Ecto.Repo.html#c:insert_or_update/2) for updating or inserting a record into the repository. This is also a way of doing upserts.

Let's move on to reading records from our repository.

## Reading Records

Let's create a simple function inside the `Challenges` module to get a challenge by its primary id. Let's call it `get_challenge_by_id` and it will look something like this:

```elixir
def get_challenge_by_id(id) do
  Challenge
  |> Repo.get(id)
end
```

As you can see, this functions is fairly straightforward. The [`Repo.get`](https://hexdocs.pm/ecto/Ecto.Repo.html#c:get/3) takes in our `Challenge` schema and the id. It returns the struct if there is a match, otherwise, `nil` will be returned.

Let's give it a try.

```elixir
alias GettingStartedWithEcto.Challenges

{:ok, challenge} = %{
  title: "Best Challenge Ever",
  description: "An example description",
  level: "easy"
} |> Challenges.create_challenge

Challenges.get_challenge_by_id(challenge.id)
```

It should return the following:

```elixir
%GettingStartedWithEcto.Challenges.Challenge{
  __meta__: #Ecto.Schema.Metadata<:loaded, "challenges">,
  description: "An example description",
  id: 51,
  inserted_at: ~N[2018-12-11 05:08:32],
  level: "easy",
  solutions: #Ecto.Association.NotLoaded<association :solutions is not loaded>,
  title: "Best Challenge Ever",
  updated_at: ~N[2018-12-11 05:08:32]
}
```

There are other function for querying the database and Ecto does support custom queries but we will cover does later. Here are some of the functions Ecto provides out of the box:

- [`Repo.one`](https://hexdocs.pm/ecto/Ecto.Repo.html#c:one/2) for fetching a single result.
- [`Repo.get_by`](https://hexdocs.pm/ecto/Ecto.Repo.html#c:get_by/3) for fetching a single result by a given column instead of the primary key.
- [`Repo.all`](https://hexdocs.pm/ecto/Ecto.Repo.html#c:all/2) for fetching all entries from a query.

Let's move on the updating records.

## Updating Records

Let's start by creating the `update_challenge` function inside the `Challenges` module.
It will take in a `%Challenge` struct as the first argument and the updated fields as a map. Our function will look something like this:

```elixir
def update_challenge(%Challenge{} = challenge, attrs \\ %{}) do
  challenge
  |> Challenge.changeset(attrs)
  |> Repo.update()
end
```

As you may already see, the update function is similar to `create_challenge`. We pass in our record as the first argument and the fields to update as the second argument. The [`Repo.update`](https://hexdocs.pm/ecto/Ecto.Repo.html#c:update/2) function takes the updated changeset and executes the query to update the record. This relies on the primary key of the record `Ecto.NoPrimaryKeyFieldError` will be raised if there is none.

Let's try updating the challenge we just created.

```elixir
alias GettingStartedWithEcto.Challenges

{:ok, challenge} = %{
  title: "Best Challenge Ever",
  description: "An example description",
  level: "easy"
} |> Challenges.create_challenge

challenge
|> Challenges.update_challenge(%{title: "Updated title"})
```

It should return a tuple `{:ok, struct}`:

```elixir
{:ok,
%GettingStartedWithEcto.Challenges.Challenge{
  __meta__: #Ecto.Schema.Metadata<:loaded, "challenges">,
  description: "An example description",
  id: 21,
  inserted_at: ~N[2018-12-08 14:13:19],
  level: "easy",
  solutions: #Ecto.Association.NotLoaded<association :solutions is not loaded>,
  title: "Updated title",
  updated_at: ~N[2018-12-08 14:13:51]
}}
```

## Deleting Records

Deleting records with Ecto is simple. Let's create the `delete_challenge` function inside our `Challenges` module. We will take a `%Challenge` struct or changeset as an argument and delete the record by calling the [`Repo.delete`](https://hexdocs.pm/ecto/Ecto.Repo.html#c:delete/2). Here's what it looks like:

```elixir
def delete_challenge(%Challenge{} = challenge) do
  challenge
  |> Repo.delete()
end
```

It returns `{:ok, struct}` if it succeeded or `{:error, changeset}` if there was an error.

What if we want to delete a record and we only have the id? We can do that by creating a struct with just the id field and passing it to the [`Repo.delete`](https://hexdocs.pm/ecto/Ecto.Repo.html#c:delete/2) function. Our function will look something like this:

```elixir
def delete_challenge(id) when is_integer(id) do
  %Challenge{id: id}
  |> Repo.delete()
end
```

With the magic of pattern matching and guards, our function will take the id and delete the record.

## One more thing

One thing to note is that I used the Ecto functions that return tuples or `nil` but there are equivalent functions that raise errors instead. For example, there is a `Repo.get!` that raises an errors instead of returning a `nil`. There is also a `Repo.delete!` that raises an error instead of returning `{:error, changeset}`. Most of these functions end with a `!`, check out the [documentation](https://hexdocs.pm/ecto/Ecto.Repo.html#content) for more info.

## Congratulations 🎉 🎉 🎉

You just learned how to create, read, update, and delete records with Ecto. On the next post, we will cover how to write advanced queries along with how to insert records with relationships.

Checkout the [source code](https://github.com/edgar971/getting_started_with_ecto/blob/master/lib/getting_started_with_ecto/challenges/challenges.ex) for reference or to see the the full module we created.
