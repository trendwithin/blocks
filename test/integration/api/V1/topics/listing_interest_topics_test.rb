require 'test_helper'

class ListingInterestTopicsTest < ActionDispatch::IntegrationTest

  test 'returns 200 status code' do
    get '/api/v1/topics/interest_topics'
    assert_equal 200, response.status
    refute_empty response.body
  end

  test 'returns topics related to interest' do
    get '/api/v1/topics/interest_topics?interest=Language'
    assert_equal 200, response.status
    refute_empty response.body
    json_response = JSON.parse(response.body)
    assert_equal 1, json_response.count
  end
end
