class Api::V1::ContestResultsController < ApplicationController

  # before_action :contest_result_update, only: %i[index show]
  # skip_before_action :set_auth, only: %i[index show]

  # def index
  #   contest_results = ContestResult.joins(:contest)
  #                              .where('contests.result_date IS NOT NULL AND contests.result_date < ?', Date.today)
  #                              .select('contest_results.contest_id, MAX(contests.result_date) AS result_date, contests.user_id')  # 適切な集約関数を適用
  #                              .group('contest_results.contest_id')
  #                              .order('result_date DESC')
  #                              .limit(10)
  #   render json: { contest_results: contest_results.as_json(include: [:contest, :user]) }

  # end

  def show
    # binding.pry
    @contest_results = ContestResult.where(contest_id: params[:contest_id]).includes(photo: :user)
    contest = Contest.find(params[:contest_id])
    # binding.pry
    awards = ['GrandPrize', 'SecondPrize', 'SelectedPrize']
    vote_hash = {}
    awards.each do |award|
      photo_id = ContestResult.by_award_photo(params[:contest_id], award )
      vote = Vote.where(photo_id: photo_id).order('RAND()').limit(1).first
      vote_hash[award]= {
        id: vote.id,
        rate: vote.rate,
        comment: vote.comment,
      }
    end
  
    results_data = @contest_results.map do |result|
      # binding.pry
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

  # def contest_result_update
  #   ContestResult.calculate_results
  # end
end
