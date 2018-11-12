Rails.application.routes.draw do
  root to: 'pages#home'
  get 'privacypolicy', to: "pages#privacypolicy"
  devise_for :users, :path => 'users'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
