require 'test_helper'

class CreatingPinsTest < ActionDispatch::IntegrationTest
  test 'creates a pin' do
    latitude = 47.623154
    longitude = -122.322318
    pin_attributes = {
        latitude: latitude,
        longitude: longitude,
        user_id: users(:user_vic).id
    }
    assert_difference('Pin.count') do
      post api_v1_pins_url, params: { pin: pin_attributes }, as: :json
    end
    assert_response :created
  end
end
