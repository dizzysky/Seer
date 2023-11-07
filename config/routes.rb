Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show]
    resource :session, only: [:show, :create, :destroy]
    
    resources :photos, only: [:show, :index, :create, :edit, :update, :destroy] do
      resources :comments, only: [:create, :index, :destroy, :update]
      delete 'tags/:tag_id', to: 'photos#remove_tag' 
      post 'add_tag', on: :member
    end


    resources :albums, only: [:index, :show, :create, :update, :destroy]


    resources :tags
  end

  get 'photos/show_html/:id', to: 'photos#show_html', as: 'photo_show_html'
  post '/api/photos', to: 'photos#create'

  # Move the catch-all to the end
  get '*path', to: "static_pages#frontend_index"
end
