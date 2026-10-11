# Go JSON API

Uses only the Go standard library. Go 1.22+ is required for method-aware `ServeMux` route patterns.

```sh
go run .
```

`GET /health`, `GET /tasks`, and `POST /tasks` (JSON: `{"title":"Write a test"}`) are available at `http://localhost:8080`. A mutex protects concurrent access. Add persistence, request limits, and graceful shutdown before production.
