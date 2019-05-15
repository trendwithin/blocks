require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test 'user pin count' do
    user = users(:user_vic)
    count = 2
    pin_count = user.pins.count
    assert_equal count, pin_count
  end
end
