Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[create desrtroy update]
      resources :photos
      get 'latest', to: 'photos#latest'
    end
  end
end
