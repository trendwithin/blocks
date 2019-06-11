class TopicSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :subject

  belongs_to :interest
end
