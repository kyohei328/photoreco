module Api
  module V1
    module CreateUserConcern
      extend ActiveSupport::Concern

      def create_user(auth, user_params)
        # binding.pry
        render json: auth, status: :unauthorized and return unless auth[:data]

        uid = auth[:data][:uid]
        email = auth[:data][:decoded_token][:payload]["email"]
        name = user_params[:name]

        render json: { message: 'すでに登録されています' } and return if User.find_by(uid: uid)

        user = User.new(name: name, uid: uid, email: email)
        if user.save
          render json: { message: '登録が成功しました' }
        else
          render json: user.errors.messages, status: :unprocessable_entity
        end
      end
    end
  end
end