Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[create desrtroy update]
      resources :photos
      resources :contests
      get 'latest', to: 'contests#latest'
    end
  end
end
