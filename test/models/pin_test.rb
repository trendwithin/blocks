require 'test_helper'

class PinTest < ActiveSupport::TestCase
  test 'returns true when pin distance under one mile' do
    expectation = true
    existing_pin = pins(:existing_pin)
    user_pin = pins(:pin_one_mile_less_from_existing_pin)
    distance = Pin.distance_between_pins_under_one_mile?(user_pin, existing_pin)
    assert_equal true, distance
  end

  test 'returns false when pin distance greater than one mile' do
    expectation = false
    existing_pin = pins(:existing_pin)
    user_pin = pins(:pin_one_mile_more_from_existing_pin)
    distance = Pin.distance_between_pins_under_one_mile?(user_pin, existing_pin)
    assert_equal expectation, distance
  end

  test 'returns pins created_at within the past hour' do
    expectation = 5
    value = Pin.created_at_within_hour
    assert_equal expectation, value.count
  end
end
