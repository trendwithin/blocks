class PinSerializer
  include FastJsonapi::ObjectSerializer
  attributes :latitude, :longitude

  belongs_to :user
end
