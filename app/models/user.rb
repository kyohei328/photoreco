class User < ApplicationRecord
  has_many :photos
  has_many :contests

  validates :email, presence: true

end
