require 'test_helper'

class ListingPinsTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:user_vic)
    sign_in(@user)
  end
  
  test 'returns index of pins' do
    get '/api/v1/pins'
    assert_equal 200, response.status
    refute_empty response.body
  end

  test 'returns pins posted within one hour' do
    get '/api/v1/pins', as: :json
    assert_equal 200, response.status

    json_response = JSON.parse(response.body)
    pin_count = json_response['data'].count
    expected_pin_count = 5
    assert_equal expected_pin_count, pin_count
  end
end
