defmodule LittlePatterns.Router do
  use Phoenix.Router
  import Plug.Conn

  pipeline :api do
    plug(:accepts, ["json"])
    plug(Plug.Parsers, parsers: [:json], pass: ["application/json"], json_decoder: Jason)
  end

  scope "/api", LittlePatterns do
    pipe_through(:api)
    get("/tasks", TaskController, :index)
    post("/tasks", TaskController, :create)
  end
end
