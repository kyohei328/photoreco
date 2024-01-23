class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :contest
  belongs_to :photo

  validates :rate, presence: true

end
