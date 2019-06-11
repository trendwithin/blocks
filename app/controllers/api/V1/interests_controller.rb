module Api
  module V1
    class InterestsController < ApiVersionOneBaseController
      def index
        render json: InterestSerializer.new(Interest.all)
      end
    end
  end
end
