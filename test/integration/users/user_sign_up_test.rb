require 'test_helper'

class UserSignUpTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'main page accessible to all' do
    get root_path
    assert_response :success
  end

  test 'main page sign up button' do
    visit root_path

    click_on 'Sign up'
    follow_redirect!
    assert_text 'Sign up'
    assert_text 'Email'
    assert_text 'Password'
  end
end
