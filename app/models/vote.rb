class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :contest
  belongs_to :photo
  # belongs_to :contest_result

  validates :rate, presence: true

end
