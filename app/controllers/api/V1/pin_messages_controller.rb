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
    end
  end
end
