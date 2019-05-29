module Api
  module V1
    class ApiVersionOneBaseController < ApplicationController
      protect_from_forgery with: :null_session
    end
  end
end
