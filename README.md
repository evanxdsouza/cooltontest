# little patterns

A compact, copy-friendly starter library for frontend components and backend APIs. Each folder is intentionally small enough to understand before you paste it into a real project.

## The gallery

| Stack | What’s inside | Start here |
|---|---|---|
| React + TypeScript | Polished, searchable template gallery and reusable UI primitives | [`templates/react-ui`](templates/react-ui) |
| SvelteKit | A responsive template catalog page | [`templates/sveltekit`](templates/sveltekit) |
| Ruby on Rails | JSON task API controller, model, route, and migration | [`templates/rails-api`](templates/rails-api) |
| Java + Spring Boot | REST controller, request validation, and record DTO | [`templates/spring-boot-api`](templates/spring-boot-api) |
| Python + FastAPI | Typed CRUD-ish task API with in-memory storage | [`templates/fastapi`](templates/fastapi) |
| Go | Standard-library JSON API with a small in-memory store | [`templates/go-api`](templates/go-api) |
| Rust + Axum | Async JSON API with shared application state | [`templates/axum-api`](templates/axum-api) |
| Dart + Flutter | Small task-list app with reusable chips and task rows | [`templates/flutter-ui`](templates/flutter-ui) |
| Elm | Functional, update-driven task list | [`templates/elm-ui`](templates/elm-ui) |
| Elixir + Phoenix | JSON controller and routes for a task API | [`templates/phoenix-api`](templates/phoenix-api) |

## Run the React gallery

```sh
cd templates/react-ui
npm install
npm run dev
```

The UI includes searchable, filterable stack cards, copyable code samples, reusable buttons, badges, and a live component showcase. It works at mobile widths and respects reduced-motion settings.

## Run the API examples

- **FastAPI:** `cd templates/fastapi && python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt && uvicorn main:app --reload`
- **Go:** `cd templates/go-api && go run .`
- **Axum:** `cd templates/axum-api && cargo run`
- **Spring Boot:** use Java 21+, then `cd templates/spring-boot-api && ./gradlew bootRun` after adding the Gradle wrapper, or import `build.gradle` in Gradle.
- **Rails / Phoenix:** these are integration-ready app slices. Add the files to a generated Rails or Phoenix app, then follow the framework-specific README.
- **SvelteKit:** `cd templates/sveltekit && npm install && npm run dev`
- **Flutter:** `cd templates/flutter-ui && flutter run` in a Flutter SDK environment.
- **Elm:** see the folder README to run with `elm reactor`.

Examples favor readable foundations over production claims. In-memory stores reset on restart; add a database, authentication, rate limits, and environment-based configuration before deploying a real service. No secrets or external service credentials are needed.

## Layout

```text
templates/
  react-ui/       # gallery app + component examples
  sveltekit/      # frontend page
  rails-api/      # Rails API slice
  spring-boot-api/# Spring REST API slice
  fastapi/        # runnable Python API
  go-api/         # runnable standard-library API
  axum-api/       # runnable Rust API
  flutter-ui/     # Flutter UI sample
  elm-ui/         # Elm UI sample
  phoenix-api/    # Phoenix API slice
```

MIT licensed. See [`LICENSE`](LICENSE).
