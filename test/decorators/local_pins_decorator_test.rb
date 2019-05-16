require 'test_helper'

class LocalPinsDecoratorTest < ActiveSupport::TestCase

  test 'when passed nil object #view_partial returns' do
    expected = 'pins/local_pins'
    value = LocalPinsDecorator.new(nil).view_partial
    assert_equal expected, value
  end
end
