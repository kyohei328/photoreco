class Api::V1::ProfilesController < ApplicationController
  
  before_action :authenticate

  def show
    render json:  { user: @current_user, avatar_url: image_url(@current_user)}
  end

  def update
    if @current_user.update(user_params)
      render json:  { user: @current_user, avatar_url: image_url(@current_user)}
    else
      render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :self_introduction, :avatar_img)
  end
  
  def image_url(avatar)
    if avatar.respond_to?(:avatar_img) && avatar.avatar_img.attached?
      rails_blob_url(avatar.avatar_img)
    else
      nil
    end
  end
end