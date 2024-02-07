class Category < ApplicationRecord
  has_many :photos

  validates :name, uniqueness: true

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "name", "updated_at"]
  end
end
