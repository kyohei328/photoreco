class Api::V1::VotesController < ApplicationController
  before_action :authenticate, only: %i[create update destroy]

  skip_before_action :set_auth, only: %i[index]

  def index
    contest = Contest.find(params[:id])
    photos = contest.photos
    render json: { photos: photos.map { |photo| { id: photo.id, title: photo.title, image_url: image_url(photo), created_at: photo.created_at } } }
  end

  def create
    vote = Vote.new(vote_params)
    vote.user = @current_user

      if vote.save
        render json: vote
      else
        render json: { errors: vote.errors.full_messages }, status: :unprocessable_entity
      end
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

  def vote_params
    params.require(:vote).permit(:rate, :comment, :photo_id, :contest_id)
  end
end
