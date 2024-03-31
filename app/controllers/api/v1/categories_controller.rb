class Api::V1::CategoriesController < ApplicationController

  def show
    categories = Category.all
    render json: categories.map { |category| category.name }
  end
end