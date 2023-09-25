Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:show, :create, :destroy]
    resources :photos, only: [:show, :index, :create, :edit, :update, :destroy] do
      resources :comments, only: [:create, :index, :destroy]
    end
  end

  # Move the catch-all to the end
  get '*path', to: "static_pages#frontend_index"
end
