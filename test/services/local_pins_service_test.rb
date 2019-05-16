require 'test_helper'
require 'minitest/mock'

class LocalPinsServiceTest < ActiveSupport::TestCase

  test 'returns nil when no pins within past hour found' do
    mock = MiniTest::Mock.new
    mock.expect :proximity_pins, nil

    LocalPinsService.stub :new, mock do
      assert_nil mock.proximity_pins
    end
    mock.verify
  end

  test 'returns records within past hour when found' do
    pins = LocalPinsService.new.proximity_pins
    assert_equal 5, pins.count
  end
end
