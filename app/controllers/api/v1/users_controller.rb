class Api::V1::UsersController < ApplicationController

  include Api::V1::CreateUserConcern

  def create
    create_user(@auth, user_params)
  end

  def update; end

  def show
    @user = User.find(params[:id])
    render json:  { user: @user, avatar_url: avatar_url(@user)}
  end

  private

  def user_params
    params.require(:user).permit(:name, :self_introduction)
  end
end