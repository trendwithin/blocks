class Pin < ApplicationRecord
  belongs_to :user
  belongs_to :topic
  has_many :pin_messages
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode


  def self.distance_between_pins_under_one_mile? user_pin, existing_pin
    distance = Geocoder::Calculations.distance_between(user_pin, existing_pin)
    distance <= 1.0 ? true : false
  end

  def self.created_at_within_hour
    Pin.where("created_at > ?", 1.hour.ago)
  end

  def pins_related_by_topic
    Pin.where(["created_at > ? and topic_id = ?", 1.hour.ago, self.topic.id])
  end

  def pinned_within_one_hour
    where("created_at >", 1.hour.ago)
  end

  def by_related_topic
    where("topic_id = ?", self.topic.id)
  end

  def pin_user_email
    self.user.email
  end
end
