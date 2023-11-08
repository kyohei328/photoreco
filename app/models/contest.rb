class Contest < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :entry_conditions, presence: true

  enum department: { serious: 0, entertainment: 1 }
end
