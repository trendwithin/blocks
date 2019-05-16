require 'test_helper'
require 'minitest/mock'

class LocalPinsServiceTest < ActiveSupport::TestCase

  test 'returns nil when no pins within past hour found' do
    mock = MiniTest::Mock.new
    def mock.proximity_pins; nil; end
    LocalPinsService.stub :new, mock do
      assert nil
    end
  end
end
