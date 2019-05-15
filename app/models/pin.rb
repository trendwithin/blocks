class Pin < ApplicationRecord
  belongs_to :user
  geocoded_by :ip_address, latitude: lat, longitude: lon
end
