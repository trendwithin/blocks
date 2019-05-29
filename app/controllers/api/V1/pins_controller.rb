module Api
  module V1
    class PinsController < ApiVersionOneBaseController
      def index
        render json: PinSerializer.new(Pin.all.created_at_within_hour)
      end

      def create
        @pin = Pin.new(pin_params)

        if @pin.save
          render json: @pin, status: :created
        else
          render json: @pin.errors, status: :unprocessable_entity
        end
      end

      private
        def pin_params
          params
            .require(:pin)
            .permit(:user_id, :longitude, :latitude)
        end
    end
  end
end
