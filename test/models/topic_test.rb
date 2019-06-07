require 'test_helper'

class TopicTest < ActiveSupport::TestCase
  test 'duplicates fail at the DB level' do
    topic = topics(:topic_italiano)
    assert_raises ActiveRecord::RecordNotUnique do
      Topic.create({subject: topic.subject, interest_id: topic.interest_id})
    end
  end
end
