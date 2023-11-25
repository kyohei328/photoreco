class User < ApplicationRecord
  has_many :photos
  has_many :contests
  has_many :contest_entries
  has_many :votes

  validates :email, presence: true


  def entry_contest(photo, contest)
    contest_entry = ContestEntry.new(user: self, photo: photo, contest: contest)
    contest_entry.save
  end

  def create_vote(photo, contest, vote_params)
    contest_entry = ContestEntry.new(user: self, photo: photo, contest: contest)
    contest_entry.save
  end


end
