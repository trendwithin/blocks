require 'test_helper'

class UserSignInTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  setup do
    @user = users(:user_vic)
  end

  test 'sign in existing user' do
    get user_session_path
    sign_in(@user)
    assert_response :success
  end

  test 'two days between user logins' do
    post user_session_path, params: { user: {
       email: users(:user_vic).email,
       password: "password"
     }}

    follow_redirect!
    value = assert_select "div#token"
    token = value.at('div')['data']
    delete destroy_user_session_path
    follow_redirect!

    travel 2.days
    post user_session_path, params: { user: {
       email: users(:user_vic).email,
       password: "password"
     }}

    follow_redirect!
    new_value = assert_select "div#token"
    new_token = new_value.at('div')['data']
    refute_equal token, new_token
  end
end
