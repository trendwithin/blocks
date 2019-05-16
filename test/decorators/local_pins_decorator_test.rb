require 'test_helper'

class LocalPinsDecoratorTest < ActiveSupport::TestCase

  test 'when passed nil object #view_partial returns' do
    expected = 'pins/no_located_pins'
    value = LocalPinsDecorator.new(nil).view_partial
    assert_equal expected, value
  end

  test 'when passed object #view_partial retruns partial' do
    expected = 'pins/located_pins'
    pin = pins(:existing_pin)
    value = LocalPinsDecorator.new(pin).view_partial
    assert_equal expected, value
  end
end
