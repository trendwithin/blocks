module Api
  module V1
    class TopicsController < ApiVersionOneBaseController
      def interest_topics
        topics = []
        if params[:interest]
          topics = Interest.find_by_curiosity(params[:interest]).topics
        end

        render json: TopicSerializer.new(topics).serialized_json
      end
    end
  end
end
