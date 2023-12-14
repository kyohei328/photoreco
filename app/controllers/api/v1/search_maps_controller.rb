class Api::V1::SearchMapsController < ApplicationController

  skip_before_action :set_auth, only: %i[show]

  def show
    photos = Photo.where.not(gps_latitude: nil, gps_longitude: nil).order(created_at: :asc)

    render json:  {
      photos: photos.map { |photo|
        {
          id: photo.id,
          title: photo.title,
          image_url: image_url(photo),
          lat: photo.gps_latitude,
          lng: photo.gps_longitude,
          user_name: photo.user&.name,
        }
      },
    }
  end

  private

  def image_url(photo)
    if photo.respond_to?(:photo_img) && photo.photo_img.attached?
      rails_blob_url(photo.photo_img)
    else
      nil
    end
  end
end
