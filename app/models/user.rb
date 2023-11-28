class User < ApplicationRecord
  has_many :photos
  has_many :contests
  has_many :contest_entries
  has_many :votes
  has_many :likes, dependent: :destroy
  has_many :like_photos, through: :likes, source: :photo

  validates :email, presence: true

  has_one_attached :avatar_img

  def entry_contest(photo, contest)
    contest_entry = ContestEntry.new(user: self, photo: photo, contest: contest)
    contest_entry.save
  end

  def create_vote(photo, contest, vote_params)
    vote = Vote.new(user: self, photo: photo, contest: contest, )
    vote.save
  end

  def like(photo)
    like_photos << photo
  end

  def unlike(photo)
    like_photos.destroy(photo)
  end

  def like?(photo)
    like_photos.include?(photo)
  end

  def validate_attachment_size
    if avatar_img.attached? && avatar_img.blob.byte_size > 10.megabytes
      errors.add(:base, 'ファイルのサイズは10MB以下にしてください')
    end
  end

end
