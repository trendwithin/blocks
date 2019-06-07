class Topic < ApplicationRecord
  belongs_to :interest
  has_many :pins
end
