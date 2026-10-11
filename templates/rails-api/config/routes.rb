Rails.application.routes.draw do
  namespace :api do
    resources :tasks, only: %i[index create update destroy]
  end
end
