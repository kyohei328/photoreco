class User < ApplicationRecord
  has_many :photos
  has_many :contests
  has_many :contest_entries

  validates :email, presence: true


  def entry_contest(photo, contest)
    contest_entry = ContestEntry.new(user: self, photo: photo, contest: contest)
    contest_entry.save
  end
end
