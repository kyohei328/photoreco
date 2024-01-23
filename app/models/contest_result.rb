class ContestResult < ApplicationRecord
  belongs_to :user
  belongs_to :contest
  belongs_to :photo

  enum award: { NoAward: 0, GrandPrize: 10, SecondPrize: 20, SelectedPrize: 30 }

  scope :by_award_photo, ->(contest_id, award) {
    joins(:photo)
      .where('contest_results.contest_id' => contest_id, 'contest_results.award' => award)
      .select('photos.id')
  }

  def self.calculate_results
    contests = Contest.where('result_date IS NOT NULL AND result_date < ?', Date.today)
    
    contests.each do |contest|
      next if ContestResult.exists?(contest_id: contest.id)
      results = Vote.joins(:photo)
                    .joins(:user)  # userテーブルとの結合を追加
                    .where(contest: contest)
                    .group('photos.id, votes.user_id')  # user_idもグループ化
                    .select('photos.id, votes.user_id, SUM(votes.rate) as total_rate')

      process_results(contest, results)
    end
  end
  
  private
  
  def self.process_results(contest, results)
    results.each_with_index do |result, index|
      user_id = result.user_id
      contest_result = ContestResult.create(
        contest_id: contest.id,
        photo_id: result.id,
        user_id: user_id,
        award: calculate_award(index + 1 )
      )
      contest_result.save!
    end
  end
  
  def self.calculate_award(rank)
    case rank
    when 1
      :GrandPrize
    when 2
      :SecondPrize
    when 3..10
      :SelectedPrize
    else
      :NoAward
    end
  end
end
