class ContestEntry < ApplicationRecord
  belongs_to :user
  belongs_to :contest
  belongs_to :photo

end
