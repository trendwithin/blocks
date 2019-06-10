require 'test_helper'

class InterestSerializerTest < ActiveSupport::TestCase

  setup do
    @interest = interests(:interest_one)
  end

  test "serializer top level key == ['data']" do
    serializer = InterestSerializer.new(@interest)
    serialized_interest = serializer.as_json
    assert_equal ['data'], serialized_interest.keys
  end

  test "serializer top level ['data'] keys match expected keys" do
    serializer = InterestSerializer.new(@interest)
    serialized_interest = serializer.as_json
    data_keys = ["id", "type", "attributes"]

    serialized_interest.each do |k, v|
      v.each do |k, v|
        assert data_keys.include?(k)
      end
    end
  end

  test 'serialized interest_one matches expcted format' do
    expected = {"data"=>{"id"=>"92684315",
               "type"=>"interest","attributes"=>{"curiosity"=>"Language"}}}

   serializer = InterestSerializer.new(@interest)
   serialized_interest = serializer.as_json

   assert_equal expected, serialized_interest
  end
end

# test "serializer top level key == ['data']" do
#   serializer = PinSerializer.new(@pin)
#   serialized_interest = serializer.as_json
#
#   assert_equal ['data'], serialized_pin.keys
# end
