class Api::V1::ContestsController < ApplicationController

  before_action :authenticate, only: %i[create update destroy]
  before_action :contest_result_update, only: %i[index]

  skip_before_action :set_auth, only: %i[index latest show]

  # new_serious_contests: new_serious_contests.map { |contest| {
  #   title: contest.title,
  #   description: contest.description,
  #   user_name: contest.user.name,
  #   user_avatar: avatar_url(contest.user),
  # } },

  def index
    if params[:q]
      @q = Contest.ransack(params[:q])
      @contest = @q.result(distinct: true).order(created_at: :desc)
      contests_result = @contest if params[:q][:result_date_lteq].present?
    else
      @contest = Contest.order(created_at: :desc).limit(10).includes(:user)
      contests_result = Contest.where('result_date <= ?', Date.today).order(created_at: :desc).limit(10)
    end
    
    render json: {
      contests: @contest.map { |contest| {
        id: contest.id,
        title: contest.title,
        description: contest.description,
        user_name: contest.user.name,
        user_avatar: avatar_url(contest.user),
      }},
      contest_count: @contest.count,
      contests_result: contests_result.as_json(include: :user)
    }
  end

  def create
    contest = @current_user.contests.build(contest_params)
    if contest.save
      render json: contest
    else
      render json: { errors: contest.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update

  end

  def show
    @contest = Contest.find(params[:id]).as_json(include: :user)
    render json: @contest
  end

  def destroy
    contest = Contest.find(params[:id])
    contest.destroy!
    post_contests = @current_user.contests
    render json: { post_contests: post_contests }
  end

  def latest
    contest = Contest.last
    render json: contest
  end

  def result

  end

  private

  def contest_params
    params.require(:contest).permit(:title, :description, :start_date, :end_date, :result_date, :entry_conditions, :department)
  end

  def contest_result_update
    ContestResult.calculate_results
  end
end
