# FastAPI task service

Runnable JSON API with typed request/response models, validation, useful status codes, and `/docs`.

```sh
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Try `GET /tasks`, `POST /tasks` with `{"title":"Sketch the first screen"}`, `PATCH /tasks/1`, or `DELETE /tasks/1`. Storage is in memory and resets when the process stops.
