# Axum API

A small async JSON API with shared state and typed handlers. Rust and Cargo are required.

```sh
cargo run
```

`GET /health`, `GET /tasks`, and `POST /tasks` with `{"title":"Ship a small thing"}` run on `http://127.0.0.1:3000`. This in-memory example is for learning; replace it with a database and avoid holding a synchronous mutex across async work in a high-throughput service.
