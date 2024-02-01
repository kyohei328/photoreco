class Contest < ApplicationRecord
  belongs_to :user

  has_many :contest_entries
  has_many :votes, through: :photos
  has_many :photos, through: :contest_entries
  has_many :contest_results, dependent: :destroy

  validates :title, presence: true
  validates :entry_conditions, presence: true

  scope :new_entertainment_contests, -> { where(department: 'エンタメ部門' ).includes(:user).order(created_at: :desc).limit(10)}
  scope :new_serious_contests, -> { where(department: 'キレイ部門' ).includes(:user).order(created_at: :desc).limit(10) }

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "department", "description", "end_date", "entry_conditions", "id", "result_date", "start_date", "title", "updated_at", "user_id"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["contest_entries", "contest_results", "photos", "user", "votes"]
  end

end
