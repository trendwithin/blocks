require 'test_helper'

class UserTest < ActiveSupport::TestCase

  test 'user pin count' do
    user = users(:user_vic)
    count = 2
    pin_count = user.pins.count
    assert_equal count, pin_count
  end

  test 'pin message count' do
    user = users(:user_vic)
    count = 1
    pin_message_count = user.pin_messages.count
    assert_equal count, pin_message_count
  end
end
