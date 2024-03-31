class Api::V1::ContestEntriesController < ApplicationController

  before_action :authenticate, only: %i[index create destroy]

  def index
    @photos = @current_user.photos
    render json: { photos: @photos.map { |photo| { id: photo.id, title: photo.title, image_url: image_url(photo), created_at: photo.created_at } } }
  end

  def create
    photo = Photo.find_by(id: params[:photo_id])
    contest = Contest.find_by(id: params[:contest_id])
    @current_user.entry_contest(photo, contest)
  end

  def destroy; end

  private

  def image_url(photo)
    if photo.respond_to?(:photo_img) && photo.photo_img.attached?
      rails_blob_url(photo.photo_img)
    else
      nil
    end
  end
end

