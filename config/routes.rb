Rails.application.routes.draw do
  root to: 'pages#home'
  get 'privacypolicy', to: "pages#privacypolicy"
  # devise_for :users, :path => 'users'
  devise_for :users, :path => 'users', :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
