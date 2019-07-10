module Api
  module V1
    class PinMessagesController < ApiVersionOneBaseController
      def index
        if params[:pin]
          render json: PinMessageSerializer.new(PinMessage.messages_related_to_pin(params[:pin]))
        else
          render json: {}
        end
      end

      def create
        @pin_message = PinMessage.new(pin_message_params)
        if @pin_message.save
          render json: @pin_message, status: :created
        else
          render json: @pin_message.errors, status: :unprocessable_entity
        end
      end

      private
        def pin_message_params
          params
            .require(:pin_message)
            .permit(:user_id, :pin_id, :message)
        end
    end
  end
end
