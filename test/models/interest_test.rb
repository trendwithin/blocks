require 'test_helper'

class InterestTest < ActiveSupport::TestCase
  test 'duplicates fail at the DB level' do
    interest = interests(:interest_one)
    assert_raises ActiveRecord::RecordNotUnique do
      Interest.create({curiosity: interest.curiosity})
    end
  end
end
