require 'test_helper'

class ListingInterestsTest < ActionDispatch::IntegrationTest

  test 'returns 200 status code' do
    get '/api/v1/interests'
    assert_equal 200, response.status
    refute_empty response.body
  end

  test 'returns index of interests' do
    get '/api/v1/interests', as: :json
    assert_equal 200, response.status

    json_response = JSON.parse(response.body)
    interests_count = json_response['data'].count
    expected_interests_count = 2
    assert_equal expected_interests_count, interests_count
  end
end
