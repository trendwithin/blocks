class Pin < ApplicationRecord
  belongs_to :user
  geocoded_by :ip
  after_validation :geocode

  def self.distance_between_pins user_pin, existing_pin
    distance = Geocoder::Calculations.distance_between(user_pin, existing_pin)
    distance <= 1.0 ? true : false
  end
end
