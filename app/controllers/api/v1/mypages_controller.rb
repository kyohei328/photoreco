class Api::V1::MypagesController < ApplicationController

  before_action :authenticate

  def show
    data_type = params[:data_type]

    case data_type
    when 'post_photos'
      render_post_photos
    when 'contest'
      render_contest
    when 'like_photos'
      render_like_photos
    else
      render json: { error: 'Invalid data type' }, status: :bad_request
    end
  end

  def update; end

  private

  def image_url(photo)
    if photo.respond_to?(:photo_img) && photo.photo_img.attached?
      rails_blob_url(photo.photo_img)
    else
      nil
    end
  end

  def render_post_photos
    page = params[:page] || 1
    per_page = params[:per_page] || 20
    photos = @current_user.photos.order(created_at: :desc).page(page).per(per_page)

    render json:  { photos: photos.map { |photo| {id: photo.id, image_url: image_url(photo) }}}
  end
  
  def render_contest
    post_contests = @current_user.contests
    entry_contests = @current_user.contest_entries.includes(:contest).map(&:contest)
    render json: { post_contests: post_contests, entry_contests: entry_contests}
  end
  
  def render_like_photos
    page = params[:page] || 1
    per_page = params[:per_page] || 20
    photos = @current_user.likes.includes(:photo).order(created_at: :desc).page(page).per(per_page).map(&:photo)

    render json:  { photos: photos.map { |photo| {id: photo.id, image_url: image_url(photo) }}}
  end
end

