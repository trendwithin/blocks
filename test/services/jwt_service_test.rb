require 'test_helper'
require 'minitest/mock'

class JwtServiceTest < ActiveSupport::TestCase
  setup do
    @payload = { 'test' => 'payload' }
  end

  test 'default .encode .decode cycle returns nil'  do
    token = JwtService.encode(@payload)
    decoded = JwtService.decode(token)
    assert_nil decoded
  end

  test '.encode .decode cycle with expiration arg' do
    token = JwtService.encode(@payload, expiration = 7)
    decoded = JwtService.decode(token)
    assert_equal @payload, decoded
  end
end
