module Api
  module V1
    class UsersController < ApiVersionOneBaseController
      def index
        render json: UserSerializer.new(User.all)
      end
    end
  end
end
