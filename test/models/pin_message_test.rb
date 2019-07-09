require 'test_helper'

class PinMessageTest < ActiveSupport::TestCase
  setup do
    @pin_message = pin_messages(:one)
  end

  test 'empty message doesnt save' do
    invalid = PinMessage.new
    assert_difference('PinMessage.count', 0) do
      invalid.save
    end
  end

  test 'nil user_id prevents save' do
    @pin_message.user = nil
    assert_difference('PinMessage.count', 0) do
      @pin_message.save
    end
  end

  test 'nil pin_id prevents save' do
    @pin_message.pin = nil
    assert_difference('PinMessage.count', 0) do
      @pin_message.save
    end
  end
end
