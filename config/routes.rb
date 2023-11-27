Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[create destroy update]
      resources :photos do
        collection do
          get :likes
        end
      end
      resources :contests
      resources :contest_entries, only: %i[index create destroy]
      resources :votes
      resources :likes, only: %i[create destroy]
      get 'latest', to: 'contests#latest'
      get 'top', to: 'top#index'
      resource :mypage, only: %i[show update]
    end
  end
end