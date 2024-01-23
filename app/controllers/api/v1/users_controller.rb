class Api::V1::UsersController < ApplicationController

  include Api::V1::CreateUserConcern

  def create
    create_user(@auth, user_params)
  end

  def update

  end

  private

  def user_params
    params.require(:user).permit(:name, :self_introduction)
  end
end