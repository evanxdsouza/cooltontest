# run the examples gallery with docker

From the repository root, build and start the gallery for all ten stacks:

```sh
docker build -t little-patterns .
docker run --rm -p 8080:8080 little-patterns
```

Open <http://localhost:8080>. The image creates a searchable gallery with source previews for React, SvelteKit, Rails, Spring Boot, FastAPI, Go, Axum, Flutter, Elm, and Phoenix. Each card links to the complete example file under `/examples/`. Node.js builds the static gallery, then Nginx serves it on port `8080`.

The Docker gallery is a browsable source showcase. The individual backend and frontend examples remain starter templates, not all-in-one running services.
