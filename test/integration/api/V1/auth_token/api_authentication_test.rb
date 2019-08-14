require 'test_helper'

class ApiAuthenticationTest < ActionDispatch::IntegrationTest

  test 'invalid user fails with Unknown Token Error' do
    user_id = -1
    token = JwtService.encode({ user_id: user_id, token_initialized: Time.now })
    get '/api/v1/pins', as: :json, headers: {Authorization: "Bearer #{token}"}
    body = response.body
    expected = "{\"data\":{\"data\":{\"errors\":[{\"status\":\"401\",\"title\":\"Unknown Token Error\"}]}}}"
    assert_equal expected, body
  end

  test 'invalid key fails with Token Verification Error' do
    user = users(:user_vic)
    token = JwtService.encode({ user_id: user.id })
    get '/api/v1/pins', as: :json, headers: {Authorization: 'Bearer XYZ'}
    body = response.body
    expected = "{\"data\":{\"data\":{\"errors\":[{\"status\":\"401\",\"title\":\"Token Verification Error\"}]}}}"
    assert_equal expected, body
  end

  test 'valid user responds with 200' do
    user = users(:user_vic)
    token = JwtService.encode({ user_id: user.id, token_initialized: Time.now })
    get '/api/v1/pins', as: :json, headers: {Authorization: "Bearer #{token}"}
    response_status = status
    expected = 200
    assert_equal expected, response_status
  end

  test 'day old token is expired' do
    user = users(:user_vic)
    token = JwtService.encode({ user_id: user.id, token_initialized: Time.now })
    travel 1.day
    travel 1.minute
    get '/api/v1/pins', as: :json, headers: {Authorization: "Bearer #{token}"}
    response_body = response.body
    expected = "{\"data\":{\"data\":{\"errors\":[{\"status\":\"401\",\"title\":\"Token Verification Error\"}]}}}"
    assert_equal expected, response_body
  end
end
