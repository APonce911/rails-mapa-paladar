Rails.application.routes.draw do
  root to: 'pages#home'
  resources :posts, only: [:create]
  # post '/', to: "posts#create"
  get 'privacypolicy', to: "pages#privacypolicy"
  get 'components', to: "pages#components"

  devise_for :users, :path => 'users', :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
