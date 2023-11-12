class Contest < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :entry_conditions, presence: true

  enum department: { serious: 0, entertainment: 1 }

  scope :new_entertainment_contests, -> { where(department: 1 ).order(created_at: :desc).limit(10) }
  scope :new_serious_contests, -> { where(department: 0 ).order(created_at: :desc).limit(10) }

end
