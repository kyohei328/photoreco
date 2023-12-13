class Photo < ApplicationRecord
  belongs_to :user

  has_one_attached :photo_img

  has_many :contest_entries
  has_many :votes, through: :photo
  has_many :likes, dependent: :destroy
  has_many :like_photos, through: :likes, source: :photo
  has_many :contest_results, dependent: :destroy

  validates :title, presence: true
  validate :validate_attachment_size

  # scope :random_three, -> { order(Arel.sql('RAND()')).limit(3) }  # MySQL
  scope :random_three, -> { order(Arel.sql('RANDOM()')).limit(3) }

  def validate_attachment_size
    if photo_img.attached? && photo_img.blob.byte_size > 20.megabytes
      errors.add(:base, 'ファイルのサイズは20MB以下にしてください')
    end
  end

  def self.ransackable_attributes(auth_object = nil)
    ["ISO_sensitivity", "aperture", "camera", "camera_make", "created_at", "description", "exposure_compensation", "focal_length", "gps_latitude", "gps_longitude", "id", "image_size_height", "image_size_width", "lens", "lens_make", "shooting_mode", "shutter_speed", "title", "updated_at", "user_id", "white_balance"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["contest_entries", "contest_results", "like_photos", "likes", "photo_img_attachment", "photo_img_blob", "user", "votes"]
  end

end
