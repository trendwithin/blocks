require 'test_helper'

class PinMessageSerializerTest < ActiveSupport::TestCase
  setup do
    @pin_message = pin_messages(:one)
  end

  test "pin message serializer top level key == ['data']" do
    serializer = PinMessageSerializer.new(@pin_message)
    serialized_pin_message = serializer.as_json
    assert_equal ['data'], serialized_pin_message.keys
  end

  test "pin message serializer top level ['data'] keys match expected keys" do
    serializer = PinMessageSerializer.new(@pin_message)
    serialized_pin_message = serializer.as_json
    data_keys = ["id", "type", "attributes", "relationships"]

    serialized_pin_message.each do |k, v|
      v.each do |k, v|
        assert data_keys.include?(k)
      end
    end
  end

  test 'pin message serializer relationships' do

  end

  test 'serialized existing_pin matches expected format' do
    expected = { "data"=>{"id"=>"980190962", "type"=>"pin_message",
      "attributes"=>{"message"=>"MyText"},
      "relationships"=>{"user"=>{"data"=>{"id"=>"615468151", "type"=>"user"}},
      "pin"=>{"data"=>{"id"=>"493553239", "type"=>"pin"}}}}}

    serializer = PinMessageSerializer.new(@pin_message)
    serialized_pin_message = serializer.as_json

    assert_equal expected, serialized_pin_message
  end
end
