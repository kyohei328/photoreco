class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include Api::V1::FirebaseAuthConcern

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
    @auth = authenticate_token_by_firebase
  end

end