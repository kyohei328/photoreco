class Api::V1::ContestsController < ApplicationController

  before_action :authenticate, only: %i[create update destroy]

  skip_before_action :set_auth, only: %i[index latest show]

  def index
    @contest = Contest.order(created_at: :desc).limit(10)
    render json: @contest
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

  private

  def contest_params
    params.require(:contest).permit(:title, :description, :start_date, :end_date, :result_date, :entry_conditions, :department)
  end

end
