require 'test_helper'

class ApiAuthenticationLoggedInUserTest < ActionDispatch::IntegrationTest

  test 'user remains signed in for two days' do
    post user_session_path, params: { user: {
       email: users(:user_vic).email,
       password: "password"
     }}

   follow_redirect!
   assert_equal 200, status
   response_body = response.body
   value = assert_select "div#token"
   token = value.at('div')['data']
   travel 2.days

   get '/api/v1/pins', as: :json, headers: { Authorization: "Bearer #{token}" }
   assert_equal 200, status
  end
end
