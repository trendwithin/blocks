Rails.application.routes.draw do

  root to: 'pages#landing'
  get 'pages/home'
  get '/pages/main'
  devise_for :users, controllers: { registrations: 'registrations' }


  get 'profile', to: 'user_profiles#user_profile', as: 'profile'
  get 'pins/pinned_locations'
  resources :pins
  # API
  namespace :api do
    namespace :v1 do
      resources :users #, only: [:index]
      resources :pins
      resources :pin_messages, only: [:index, :create]
      resources :interests, only: [:index]
      get 'topics/interest_topics'
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
