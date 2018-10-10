---
title: 'Getting Started with Ecto: Part 2'
date: '2018-10-03'
---

Welcome to part two of Getting Started with Ecto. In the last post, we covered how to install and configure Ecto in our application. In this post, we will cover migrations, schemas, changesets, and how to execute simple queries in Ecto.

## Migrations

Now that we have a database, we are going to create tables and columns. To do that, we will create migrations that define the structure of our tables and define any relationships. Before we create our first migration, let's look at the database design of our demo application.

![Database design](database.svg)

- Users have credentials with a unique email
- Challenges have many solutions.
- Users can have one solution per challenge.

#### Generating Migrations

Let's go ahead and create our first migration by running the following generator command:

```bash
mix ecto.gen.migration create_users_table
```

That will create a file inside of `priv/repo/migrations/` that looks something like this:

```elixir
defmodule GettingStartedWithEcto.Repo.Migrations.CreateUsersTable do
  use Ecto.Migration

  def change do

  end
end
```

Let's define our table inside the [`change`](https://hexdocs.pm/ecto/Ecto.Migration.html#module-change) function that allows us to create reversible migrations.

```elixir
def change do
  create table(:users) do
    add(:name, :string, size: 100)
    add(:age, :integer)

    timestamps()
  end
end
```

The column name and type are defined as atoms. We defined the name as a string with a character limit of 100 and age is an integer. We also use the `timestamps` function that adds `:inserted_at` and `:updated_at` timestamps columns. See the docs for other [primitive types](https://hexdocs.pm/ecto/Ecto.Schema.html#module-primitive-types).

#### Running Migrations

Now that we have our migrations, let's run them with the following command:

```bash
mix ecto.migrate
```

You should see the following output if it succeded:

```bash
16:07:36.057 [info]  == Running GettingStartedWithEcto.Repo.Migrations.CreateUsersTable.change/0 forward
16:07:36.057 [info]  create table users
16:07:36.068 [info]  == Migrated in 0.0s
```

If we look at our database, we see two tables: `schema_migrations` and `users`. The `schema_migrations` keeps track of our migrations and the order they were executed. This allows Ecto to rollback migrations.

Let's move on to the `credentials` migration. I won't go over how to generate and run migrations since that's been covered. This is how our credentials migration should look like:

```elixir
defmodule GettingStartedWithEcto.Repo.Migrations.CreateCredentialsTable do
  use Ecto.Migration

  def change do
    create table(:credentials) do
      add(:email, :string)
      add(:password_hash, :string)
      add(:user_id, references(:users, on_delete: :delete_all), null: false)

      timestamps()
    end

    create(unique_index(:credentials, [:email]))
    create(index(:credentials, [:user_id]))
  end
end
```

Notice that our `user_id` references the `users` table. We set the `:on_delete` to `:delete_all` which deletes the `credentials` record when the user record is deleted. Check out the [Ecto docs](https://hexdocs.pm/ecto/Ecto.Migration.html#references/2-options) for other supported options. Lastly, we set `null` to `false` which prevents the `user_id` from being `null`.

We also created an index on the `email` and a unique index on the `user_id` columns.
See the [`unique_index`](https://hexdocs.pm/ecto/Ecto.Migration.html#unique_index/3) and [`index`](https://hexdocs.pm/ecto/Ecto.Migration.html#index/3) functions for more info.

Our `solutions` and `challenges` migrations don't cover anything new so I will skip them but check out the [source code](https://github.com/edgar971/getting_started_with_ecto/tree/master/priv/repo/migrations) reference.

Let's move on to creating schemas.

## Schemas

Schemas are modules that represent data from our database. They define table and column mapping, help functions, and changesets.

#### Creating Schemas

Let's create our first schema by creating a directory inside the `lib` directory. In our demo app, it's inside `lib/getting_started_with_ecto/accounts/user.ex` and it looks like this:

```elixir
defmodule GettingStartedWithEcto.Accounts.User do
  use Ecto.Schema

  schema "users" do
    field(:name, :string)
    field(:age, :integer)

    timestamps()
  end
end
```

We use the [`schema`](https://hexdocs.pm/ecto/Ecto.Schema.html#content) macro to map the users table and columns to a struct.
We define the name column to a string and the age as an integer. Lastly, we call the [`timestamps`](Generates :inserted_at and :updated_at timestamp fields) function to generate the `:inserted_at` and `:updated_at` timestamp fields.

#### Schema Relationships

Let's create the `credentials` schema. In our demo app, it's inside `lib/getting_started_with_ecto/accounts/user.ex`:

```elixir
defmodule GettingStartedWithEcto.Accounts.Credential do
  use Ecto.Schema
  alias GettingStartedWithEcto.Accounts.User

  schema "users" do
    field(:email, :string)
    field(:password_hash, :integer)
    belongs_to(:user, User)

    timestamps()
  end
end
```

The new thing here is how we define our one-to-one relationship with the `users` table. We use the [`belongs_to`](https://hexdocs.pm/ecto/Ecto.Schema.html#belongs_to/3) which does most of the work for us. Notice the second parameter is the `User` schema.

We also want to get the credentials when querying the user, let's add that to our `User` schema. We will do that by adding `has_one(:credential, Credential)` to the `User` schema file.

```elixir
defmodule GettingStartedWithEcto.Accounts.User do
  use Ecto.Schema
  alias GettingStartedWithEcto.Accounts.Credential

  schema "users" do
    field(:name, :string)
    field(:age, :integer)
    has_one(:credential, Credential)

    timestamps()
  end
end
```

> Note: Don't forget to add the `GettingStartedWithEcto.Accounts.Credential` alias at the top of the file.

Our `solution` and `challenge` schemas don't cover anything new so I will skip them but check out the [source code](https://github.com/edgar971/getting_started_with_ecto/tree/master/lib/getting_started_with_ecto/challenges) reference.

Let's move on to changesets.

## Schema Changesets

Changesets allow us to filter and cast our schema fields, as well as tracking and validating data before it gets to the
database.
