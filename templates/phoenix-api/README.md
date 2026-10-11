# Phoenix JSON API slice

A small Phoenix 1.7 router and controller example. It uses Plug.Cowboy directly and Jason for JSON, so it is intentionally database-free.

```sh
mix deps.get
mix run --no-halt
```

The server listens on port 4000. Try `GET /api/tasks` and `POST /api/tasks` with `{"title":"Make a small thing"}`. This folder is an app skeleton, not a full `mix phx.new` output; add supervision children, tests, and Ecto persistence as your application grows.
