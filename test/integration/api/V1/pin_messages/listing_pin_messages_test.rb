require 'test_helper'

class ListingPinMessagesTest < ActionDispatch::IntegrationTest

  test 'returns 200 status code' do
    get '/api/v1/pin_messages'
    assert_equal 200, response.status
    refute_empty response.body
  end

  test 'index returns empty object' do
    expected = {}
    get '/api/v1/pin_messages', as: :json
    json_response = JSON.parse(response.body)
    assert_equal expected, json_response
  end

  test 'index returns expected count of 1 message' do
    message = pin_messages(:three)
    pin_id = message.pin.id
    expected = 1

    get "/api/v1/pin_messages?pin=#{pin_id}", as: :json
    json_response = JSON.parse(response.body)
    result = json_response['data'].count
    assert_equal expected, result
  end
end
