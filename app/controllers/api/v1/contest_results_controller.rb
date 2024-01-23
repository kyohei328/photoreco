class Api::V1::ContestResultsController < ApplicationController

  def show
    @contest_results = ContestResult.where(contest_id: params[:contest_id]).includes(photo: :user)
    contest = Contest.find(params[:contest_id])
    awards = ['GrandPrize', 'SecondPrize', 'SelectedPrize']
    vote_hash = {}
    awards.each do |award|
      photo_id = ContestResult.by_award_photo(params[:contest_id], award )
      vote = Vote.where(photo_id: photo_id).order('RANDOM()').limit(1).first
      vote_hash[award]= {
        id: vote.id,
        rate: vote.rate,
        comment: vote.comment,
      } if vote
    end
  
    results_data = @contest_results.map do |result|
      {
        result: result,
        photo: {
          id: result.photo.id,
          title: result.photo.title,
          image_url: image_url(result.photo),
        },
        user: {
          id: result.photo.user.id,
          name: result.photo.user.name,
        },
      }
    end
  
    render json: { results: results_data, contest: contest, vote: vote_hash }
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
