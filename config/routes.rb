Rails.application.routes.draw do
  get 'signup/index'

  root 'top#index'
  resources :items, only: [:index, :new]
  resources :users, only: [:index]
  resources :signup, only: [:index]

end
