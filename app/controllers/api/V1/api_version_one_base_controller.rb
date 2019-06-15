module Api
  module V1
    class ApiVersionOneBaseController < ActionController::API
      protect_from_forgery with: :null_session
    end
  end
end
