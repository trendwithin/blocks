require 'test_helper'

class PinTest < ActiveSupport::TestCase
  attr_reader :user, :pin, :topic

  setup do
    @user = users(:user_vic)
    @pin = pins(:existing_pin)
    @topic = topics(:topic_italiano)
  end

  test 'creates a new pin' do
    latitude = 47.623154
    longitude = -122.322318
    pin = Pin.new
    pin.latitude = latitude
    pin.longitude = longitude
    pin.user_id = user.id
    pin.topic_id = topic.id
    assert pin.valid?
  end

  test 'nil longitude raises Exception' do
    pin.longitude = ''
    assert_raises  ActiveRecord::NotNullViolation do
      pin.save
    end
  end

  test 'nil latitude raises Exception' do
    pin.latitude = ''
    assert_raises  ActiveRecord::NotNullViolation do
      pin.save
    end
  end

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

  test 'pin related to current user topic' do
    expectation = 3
    result = pin.pins_related_by_topic.count
    assert_equal expectation, result
  end
end
