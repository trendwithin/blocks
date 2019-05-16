Rails.application.routes.draw do
  root to: 'pages#home'
  devise_for :users

  get 'pins/pinned_locations'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
