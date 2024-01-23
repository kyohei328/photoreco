class Api::V1::LikesController < ApplicationController
  before_action :authenticate, only: %i[create destroy]
  
  def create
    @photo = Photo.find(params[:photo_id])
    @current_user.like(@photo)
  end

  def destroy
    @photo = @current_user.likes.find(params[:id]).photo
    @current_user.unlike(@photo)
  end
end
