class User < ApplicationRecord
  has_many :photos

  validates :email, presence: true

end
