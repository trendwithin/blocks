require 'test_helper'

class UserSignInTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  setup do
    @user = users(:user_vic)
  end

  test 'sign in existing user' do
    get user_session_path
    sign_in(@user)
  end
end
