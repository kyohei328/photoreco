class Api::V1::TopController < ApplicationController
  
  # before_action :today_photos_count, only: %i[index]
  skip_before_action :set_auth, only: %i[index]

  def index
    # binding.pry
    unless TodayPhoto.any?
      @photos = Photo.random_three

      @photos.each do |photo|
        TodayPhoto.create(photo: photo)
      end

    else
      today_photos = TodayPhoto.all
      @photos = today_photos.map(&:photo)
    end
    # photos = Photo.order('RAND()').limit(3)
    new_entertainment_contests = Contest.new_entertainment_contests
    new_serious_contests = Contest.new_serious_contests

    # render json: { today_photos: @photos.map { |photo| rails_blob_url(photo.photo_img) } }
    render json: {
      today_photos: @photos.map { |photo| rails_blob_url(photo.photo_img) },
      new_entertainment_contests: new_entertainment_contests,
      new_serious_contests: new_serious_contests
    }
  end

  private

end
