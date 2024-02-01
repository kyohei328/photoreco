class Api::V1::TopController < ApplicationController

  skip_before_action :set_auth, only: %i[index]

  def index
    unless TodayPhoto.any?
      @photos = Photo.random_three
      @photos.each do |photo|
        TodayPhoto.create(photo: photo)
      end

    else
      today_photos = TodayPhoto.all
      @photos = today_photos.map(&:photo)
    end
    new_entertainment_contests = Contest.new_entertainment_contests
    new_serious_contests = Contest.new_serious_contests

    render json: {
      today_photos: @photos.map { |photo| rails_blob_url(photo.photo_img) },
      new_entertainment_contests: new_entertainment_contests.map { |contest| {
          title: contest.title,
          description: contest.description,
          user_name: contest.user.name,
          user_avatar: avatar_url(contest.user),
        } },
      new_serious_contests: new_serious_contests.map { |contest| {
        title: contest.title,
        description: contest.description,
        user_name: contest.user.name,
        user_avatar: avatar_url(contest.user),
      } },
    }
  end
end
