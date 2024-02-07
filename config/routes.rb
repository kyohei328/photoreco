Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[create destroy update]
      resources :photos do
        collection do
          get :likes
        end
      end
      resources :contests do
        resource :contest_results, only: %i[show]
      end
      resources :contest_entries, only: %i[index create destroy]
      resources :votes
      resources :likes, only: %i[create destroy]
      get 'latest', to: 'contests#latest'
      get 'top', to: 'top#index'
      resource :mypage, only: %i[show update]
      resource :profile, only: %i[show update]
      resource :category, only: %i[show]
      resource :search_map, only: %i[show]
      get '/health_check', to: proc { [200, {}, ['']] }
    end
  end
end