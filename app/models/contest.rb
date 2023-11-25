class Contest < ApplicationRecord
  belongs_to :user

  has_many :contest_entries
  has_many :votes
  has_many :photos, through: :contest_entries

  validates :title, presence: true
  validates :entry_conditions, presence: true

  # scope :new_entertainment_contests, -> { where(department: 1 ).order(created_at: :desc).limit(10) }
  # scope :new_serious_contests, -> { where(department: 0 ).order(created_at: :desc).limit(10) }
  scope :new_entertainment_contests, -> { where(department: 'エンタメ部門' ).order(created_at: :desc).limit(10) }
  scope :new_serious_contests, -> { where(department: 'キレイ部門' ).order(created_at: :desc).limit(10) }

end
