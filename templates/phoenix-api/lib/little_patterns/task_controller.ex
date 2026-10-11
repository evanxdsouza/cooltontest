defmodule LittlePatterns.TaskController do
  use Phoenix.Controller, formats: [:json]
  import Plug.Conn

  def index(conn, _params) do
    json(conn, %{tasks: []})
  end

  def create(conn, %{"title" => title}) when is_binary(title) do
    clean_title = String.trim(title)

    if clean_title == "" or String.length(clean_title) > 120 do
      conn
      |> put_status(:unprocessable_entity)
      |> json(%{error: "title must be 1–120 characters"})
    else
      conn
      |> put_status(:created)
      |> json(%{task: %{id: System.unique_integer([:positive]), title: clean_title, done: false}})
    end
  end

  def create(conn, _params) do
    conn |> put_status(:bad_request) |> json(%{error: "title is required"})
  end
end
