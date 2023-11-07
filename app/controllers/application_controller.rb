class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include Api::V1::FirebaseAuthConcern

  # before_action :set_cross_origin_opener_policy

  # def authenticate(set_auth)
  #   uid = @auth[:data][:uid]
  #   @current_user = User.find_by!(uid: uid)
  # rescue => e
  #   logger.error "Error in authenticate_user: #{e.message}"
  #   render json: { error: 'Not Authorized' }, status: :unauthorized
  # end
  before_action :set_auth

  def authenticate
    uid = @auth[:data][:uid]
    @current_user = User.find_by!(uid: uid)
  rescue => e
    logger.error "Error in authenticate_user: #{e.message}"
    render json: { error: 'Not Authorized' }, status: :unauthorized
  end

  private

  def form_authenticity_token; end

  def set_auth
    # binding.pry
    @auth = authenticate_token_by_firebase
  end

  # def set_cross_origin_opener_policy
  #   response.set_header('Cross-Origin-Opener-Policy', 'same-origin; allow-popups')
  # end

end