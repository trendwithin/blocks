require 'test_helper'

class InterestSerializerTest < ActiveSupport::TestCase

  setup do
    @topic = topics(:topic_italiano)
  end

  test "serializer top level key == ['data']" do
    serializer = TopicSerializer.new(@topic)
    serialized_topic = serializer.as_json
    assert_equal ['data'], serialized_topic.keys
  end

  test "serializer top level ['data'] keys match expected keys" do
    serializer = TopicSerializer.new(@topic)
    serialized_topic = serializer.as_json
    data_keys = ["id", "type", "attributes", "relationships"]
    serialized_topic.each do |k, v|
      v.each do |k, v|
        assert data_keys.include?(k)
      end
    end
  end

  test 'serialized existing_pin matches expected format' do
    expected = { "data"=>{"id"=>"850556941", "type"=>"topic",
      "attributes"=>{"id"=>850556941, "subject"=>"Italian"},
      "relationships"=>{"interest"=>{"data"=>{"id"=>"92684315", "type"=>"interest"}}}}}

    serializer = TopicSerializer.new(@topic)
    serialized_topic = serializer.as_json
    assert_equal expected, serialized_topic
  end
end
