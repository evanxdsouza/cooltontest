# run the gallery with docker

From the repository root, build and start the React template gallery:

```sh
docker build -t little-patterns .
docker run --rm -p 8080:8080 little-patterns
```

Open <http://localhost:8080>. The image builds the static gallery with Node.js 22, then serves it with Nginx on port `8080`. Vite routes fall back to `index.html` for client-side navigation.
