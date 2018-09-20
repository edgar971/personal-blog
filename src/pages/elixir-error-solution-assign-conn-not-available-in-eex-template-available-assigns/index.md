---
title: "Elixir Error Solution: assign @conn not available in eex template. Available assigns: []"
date: "2017-07-15"
path: "/2017/07/15/elixir-error-solution-assign-conn-not-available-in-eex-template-available-assigns"
---

## Problem
I was breaking my Elixir templates into a subtemplate but I was getting the following error:
```
assign @conn not available in eex template.

Please make sure all proper assigns have been set. If this
is a child template, ensure assigns are given explicitly by
the parent template as they are not automatically forwarded.
Available assigns: [:event]
```

My parent template looked something like this: 
```elixir
<h1>All Events</h1>
<div class="list-group">

    <%= for event <- @events do %>
        <%= render "summary.html", event: event %>
    <% end %>
</div>
```

and my child template like this:
```elixir
<p>
  <a href="<%= event_path @conn, :show, @event %>">
    <%= @event.title %> - <small><%= @event.location %></small>
  </a>
</p>
```
## Solution
The solution is simple, pass the @conn to your child template like this: 
```elixir
<h1>All Events</h1>
<div class="list-group">
    <%= for event <- @events do %>
        <%= render "summary.html", event: event, conn: @conn %>
    <% end %>
</div>
```
That is it, I hope I was able to help. 
