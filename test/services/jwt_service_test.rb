require 'test_helper'
require 'minitest/mock'

class JwtServiceTest < ActiveSupport::TestCase
  setup do
    @payload = { 'test' => 'payload' }
  end

  test 'default .encode .decode without explicit expiration'  do
    travel_to Time.zone.local(2019, 9, 14, 01, 04, 44) do
      token = JwtService.encode(@payload)
      decoded = JwtService.decode(token)
      expected = { "test"=>"payload", "exp"=>1568509484 }
      assert_equal expected,  decoded
    end

  end

  test '.encode .decode cycle with expplicit expiration arg' do
    travel_to Time.zone.local(2019, 9, 14, 01, 04, 44) do
      token = JwtService.encode(@payload, expiration = 7)
      decoded = JwtService.decode(token)
      expected = { "test"=>"payload", "exp"=>1568509484 }
      assert_equal expected,  decoded
    end
  end
end
