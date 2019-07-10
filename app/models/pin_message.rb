class PinMessage < ApplicationRecord
  belongs_to :user
  belongs_to :pin

  validates :message, presence: true

  def self.messages_related_to_pin(pin_id)
    PinMessage.where("pin_id=?", pin_id)
  end
end
