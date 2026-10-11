defmodule LittlePatterns.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {Plug.Cowboy, scheme: :http, plug: LittlePatterns.Router, options: [port: 4000]}
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: LittlePatterns.Supervisor)
  end
end
