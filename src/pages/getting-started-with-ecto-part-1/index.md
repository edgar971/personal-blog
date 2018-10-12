---
title: 'Getting Started with Ecto: Part 1'
date: '2018-09-26'
---

Welcome to part one of Getting Started with Ecto. This post is part of a series to teach you how to use Ecto. I will go over how to setup Ecto, create migrations and schemas, along with simple and more complicated queries. By the end of the series, you will be able to comfortably use Ecto with Postgres in your Elixir applications.

## What is Ecto?

Ecto is a database package for Elixir applications. It is used for writing database queries and interacting with your database. With Ecto you can create migrations, define schemas, create and update records, and query your database. The current version supports PostgreSQL and MySQL but support for MSSQL, SQLite, and MongoDB will be added in the future.

## Installation and Setup

Let's start by adding and configuring Ecto in our Elixir application. Feel free to skip this step if you have this done already or if you are using Phoenix.

1. Lets add the `ecto` and `postgrex` packages to our `deps` function in the `mix.exs` file:

```elixir
defp deps do
    [
      {:ecto, "~> 2.2"},
      {:postgrex, "~> 0.13.5"}
    ]
end
```

NOTE: Postgrex is used to execute Ecto queries against our Postgres database.

2. Run `mix deps.get` to install our added dependencies.

Now that we have those packages installed, let's configure Ecto. We can do that by running the following [generator command](https://hexdocs.pm/ecto/Mix.Tasks.Ecto.html):

```
mix ecto.gen.repo -r GettingStartedWithEcto.Repo
```

This will generate our Repo, used to connect and query our database, in `lib/getting_started_with_ecto/repo.ex`:

```
defmodule GettingStartedWithEcto.Repo do
  use Ecto.Repo, otp_app: :getting_started_with_ecto
end
```

And update our config to connect to the database:

```elixir
config :getting_started_with_ecto, GettingStartedWithEcto.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "getting_started_with_ecto_repo",
  username: "user",
  password: "pass",
  hostname: "localhost"
```

The one thing the generator didn't do is tell our Elixir application about our `GettingStartedWithEcto.Repo`.
Add the following line at the end of`config.exs`:

```
config :getting_started_with_ecto, ecto_repos: [GettingStartedWithEcto.Repo]
```

NOTE: Your Postgres configuration might be different.

1. Double check your username, password, and host if you are having problems connecting.
1. The default port of `5432` is used but you can change it by adding to the config above: `port: 15432`

The last thing we need to do is set up the `GettingStartedWithEcto.Repo` as a supervisor within our application's
supervision tree inside `lib/getting_started_with_ecto/application.ex`:

```elixir
def start(_type, _args) do
    children = [
      GettingStartedWithEcto.Repo
    ]
    opts = [strategy: :one_for_one, name: GettingStartedWithEcto.Supervisor]
    Supervisor.start_link(children, opts)
end
```

## Creating the database

This last step should be easy if everything is installed and configured properly.

The following command creates our database:

```bash
mix ecto.create
```

You should see the following message if everything was successful:

```
The database for GettingStartedWithEcto.Repo has been created
```

The `GettingStartedWithEcto.Repo` is our repository that handles our database queries.

## Congratulations 🎉 🎉 🎉

You have installed and configured Ecto. On the next post, we will learn how to create migrations and schemas in our Elixir application.
