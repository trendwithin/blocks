require 'test_helper'

class PinSerializerTest < ActiveSupport::TestCase
  setup do
    @pin = pins(:existing_pin)
  end

  test "serializer top level key == ['data']" do
    serializer = PinSerializer.new(@pin)
    serialized_pin = serializer.as_json

    assert_equal ['data'], serialized_pin.keys
  end

  test "serializer top level ['data'] keys match expected keys" do
    serializer = PinSerializer.new(@pin)
    serialized_pin = serializer.as_json
    data_keys = ["id", "type", "attributes", "relationships"]

    serialized_pin.each do |k, v|
      v.each do |k, v|
        assert data_keys.include?(k)
      end
    end
  end

  test 'serialized existing_pin matches expected format' do
    expected = { "data"=>{"id"=>"493553239", "type"=>"pin",
      "attributes"=>{ "latitude"=>47.623154, "longitude"=>-122.322318 },
      "relationships"=>{ "user"=>{"data"=>{"id"=>"615468151", "type"=>"user" }}}}}

    serializer = PinSerializer.new(@pin)
    serialized_pin = serializer.as_json

    assert_equal expected, serialized_pin
  end
end
