require 'test_helper'

class UserSignUpTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'main page accessible to all' do
    get root_path
    assert_response :success
  end
end
