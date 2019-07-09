class PinMessageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :message

  belongs_to :user
  belongs_to :pin
end
