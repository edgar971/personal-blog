---
title: 'Getting Started With Ecto Part 4: Advanced Queries'
published: false
date: '2019-01-08'
---

Welcome to part four of Getting Started with Ecto. On the [last post](/getting-started-with-ecto-part-3/), we learned how to create, read, update, and delete records with Ecto. In this post, we will learn how to write more advanced queries with Ecto.

1. [Installing and Configuring Ecto](/getting-started-with-ecto-part-1/)
1. [Migrations, Schemas, and Changesets](/getting-started-with-ecto-part-2/)
1. [CRUD operations](/getting-started-with-ecto-part-3/)
1. Advanced Queries (This Post)

# Relationships

On the last post, we learned how to insert a single record with no relationships. Now we are going to learn how to create records that have relationships. In this example it's creating a user with credentials.

Let's start by defining the `Accounts` module inside `getting_started_with_ecto/accounts/accounts.ex`. Inside of that module, we will define a function called `create_users_with_credentials` that takes one argument with a map as the default. In this function, we will validate the user and credentials and insert them both into the database. Here's how that looks like:

```elixir
defmodule GettingStartedWithEcto.Accounts do
  alias GettingStartedWithEcto.Accounts.{User, Credential}
  alias GettingStartedWithEcto.Repo

  def create_user_with_credentials(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Ecto.Changeset.cast_assoc(:credential, with: &Credential.changeset/2)
    |> Repo.insert()
  end
end
```

> Notice the default map argument

We first pass an empty `%User{}` struct and the `attrs` to the `User.changeset` function to validate our data.
After that, we pipe the result to the [`cast_assoc`](https://hexdocs.pm/ecto/Ecto.Changeset.html#cast_embed/3). This function maps the `credential` association, runs the `Credential.changeset` function, and returns a changeset with our user and credentials. Lastly, we call `Repo.insert` which will insert the records into the database.

# Loading Associations

# The Ecto.Query module

# Table Joins
