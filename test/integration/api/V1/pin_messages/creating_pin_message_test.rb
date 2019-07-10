require 'test_helper'

class CreatingPinMessagesTest < ActionDispatch::IntegrationTest

  test 'create a pin with valid data' do
    user_vic = users(:user_vic)
    pin = pins(:pin_one_mile_less_from_existing_pin)
    message = 'I am next door at...'

    message_attributes = { user_id: user_vic.id, pin_id: pin.id, message: message }

    assert_difference('PinMessage.count') do
      post api_v1_pin_messages_url, params: { pin_message: message_attributes }, as: :json
    end
    assert_response :created
  end

  test 'response status unporcessable when pin_message lacks message' do
    user_vic = users(:user_vic)
    pin = pins(:pin_one_mile_less_from_existing_pin)
    message = ''

    message_attributes = { user_id: user_vic.id, pin_id: pin.id, message: message }

    assert_difference('PinMessage.count', 0) do
      post api_v1_pin_messages_url, params: { pin_message: message_attributes }, as: :json
    end
    assert_response :unprocessable_entity
  end
end
