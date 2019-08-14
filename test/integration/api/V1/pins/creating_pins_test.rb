require 'test_helper'

class CreatingPinsTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:user_vic)
    # sign_in(@user)
  end

  test 'creates a pin with valid data' do
    sign_in(@user)
    latitude = 47.623154
    longitude = -122.322318
    pin_attributes = {
        latitude: latitude,
        longitude: longitude,
        user_id: users(:user_vic).id,
        topic_id: topics(:topic_italiano).id
    }
    assert_difference('Pin.count') do
      post api_v1_pins_url, params: { pin: pin_attributes }, as: :json
    end
    assert_response :created
  end

  test 'logged out user creates a pin with valid data' do
    latitude = 47.623154
    longitude = -122.322318
    pin_attributes = {
        latitude: latitude,
        longitude: longitude,
        user_id: users(:user_vic).id,
        topic_id: topics(:topic_italiano).id
    }
    assert_difference('Pin.count', 0) do
      post api_v1_pins_url, params: { pin: pin_attributes }, as: :json
    end
    assert_response :unauthorized
  end

  test 'resonse status when unprocessable entity' do
    sign_in(@user)
    latitude = 47.623154
    longitude = -122.322318
    pin_attributes = {
        latitude: latitude,
        longitude: longitude,
        user_id: users(:user_vic).id
    }

    assert_difference('Pin.count', 0) do
      post api_v1_pins_url, params: { pin: pin_attributes }, as: :json
    end
    assert_response :unprocessable_entity
  end

  test 'token based create fails without header when user not logged in' do
    user = users(:user_vic)
    token = JwtService.encode(user_id: user.id, token_initialized: Time.now)
    latitude = 47.623154
    longitude = -122.322318
    pin_attributes = {
      latitude: latitude,
      longitude: longitude,
      user_id: user.id
    }

    assert_difference('Pin.count', 0) do
      post api_v1_pins_url, params: { pin: pin_attributes }, as: :json
    end
    assert_response :unauthorized
  end
end
