Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[create desrtroy update]
      resources :photos
      resources :contests
      resources :contest_entries, only: %i[index create destroy]
      resources :votes
      get 'latest', to: 'contests#latest'
      get 'top', to: 'top#index'
    end
  end
end
