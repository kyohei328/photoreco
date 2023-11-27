class Api::V1::MypagesController < ApplicationController

  before_action :authenticate

  def show
    # photos = @current_user.photos
    # post_contest = @current_user.contests
    # entry_contests = @current_user.contest_entries.includes(:contest).map(&:contest)
    # liked_photos = @current_user.likes.includes(:photo).map(&:photo)

    # render json: {
    #   photos: photos.map { |photo| {id: photo.id, image_url: image_url(photo) }},
    #   post_contest: post_contest,
    #   entry_contests: entry_contests,
    #   liked_photos: liked_photos.map { |photo| {id: photo.id, image_url: image_url(photo) }},
    # }

    data_type = params[:data_type]

    case data_type
    when 'photos'
      render_photos
    when 'contest'
      render_contest
    when 'liked_photos'
      render_liked_photos
    else
      render json: { error: 'Invalid data type' }, status: :bad_request
    end
  end

  def update

  end

  private

  def image_url(photo)
    if photo.respond_to?(:photo_img) && photo.photo_img.attached?
      rails_blob_url(photo.photo_img)
    else
      nil
    end
  end

  def render_photos
    photos = @current_user.photos
    render json: {
      photos: photos.map { |photo| { id: photo.id, image_url: image_url(photo) } }
    }
  end
  
  def render_contest
    post_contests = @current_user.contests
    entry_contests = @current_user.contest_entries.includes(:contest).map(&:contest)
    render json: { post_contests: post_contests, entry_contests: entry_contests}
  end
  
  def render_liked_photos
    liked_photos = @current_user.likes.includes(:photo).map(&:photo)
    render json: {
      liked_photos: liked_photos.map { |photo| { id: photo.id, image_url: image_url(photo) } }
    }
  end

end

