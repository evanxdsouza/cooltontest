# Rails JSON API slice

Drop these files into a Rails 7.1+ app. Add `config.api_only = true` if the application is API-only, then run:

```sh
bin/rails db:migrate
bin/rails server
```

Requests use `/api/tasks`; create/update JSON is shaped as `{"task":{"title":"Sketch it","done":false}}`. The controller returns validation errors as JSON and uses `204 No Content` for deletion. Authentication and authorization are intentionally left to the host app.
