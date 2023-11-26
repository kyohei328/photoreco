class Photo < ApplicationRecord
  belongs_to :user

  has_one_attached :photo_img

  has_many :contest_entries
  has_many :votes
  has_many :likes, dependent: :destroy
  has_many :like_photos, through: :likes, source: :photo

  validates :title, presence: true
  validate :validate_attachment_size

  scope :random_three, -> { order(Arel.sql('RAND()')).limit(3) }

  def validate_attachment_size
    if photo_img.attached? && photo_img.blob.byte_size > 20.megabytes
      errors.add(:base, 'ファイルのサイズは20MB以下にしてください')
    end
  end
end
