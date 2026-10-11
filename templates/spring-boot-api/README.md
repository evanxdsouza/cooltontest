# Spring Boot API

Java 21 + Spring Boot REST API with request validation and record-based JSON DTOs. Gradle 8+ is required; generate the wrapper once with `gradle wrapper` if needed.

```sh
gradle bootRun
```

`GET /api/tasks`, `POST /api/tasks` with `{"title":"Sketch a screen"}`, and `PATCH /api/tasks/{id}/toggle` are available on port 8080. Storage is in memory. Add persistence and a global validation-error handler for a production service.
