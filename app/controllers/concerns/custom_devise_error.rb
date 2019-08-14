module CustomDeviseError
  class JwtExceptionHandler < Devise::FailureApp

    def respond
      if request.controller_class.to_s.start_with? 'Api'
        json_api_error_response
      else
        super
      end
    end

    def json_api_error_response
      title = set_devise_error_title(i18n_message)
      self.status        = 401
      self.content_type  = 'application/json'
      self.response_body = { data: { data: {errors: [{ status: '401', title: title }]} } }.to_json
    end

    def set_devise_error_title title
      case title
      when "decode_error"
        "Token Validation Error"
      when "verification_error"
        "Token Verification Error"
      else
        "Unknown Token Error"
      end
    end
  end
end

# def render_error(status, resource = nil)
#   render status: status, json: (resource ? { error: resource } : nil )
# end
#
# def respond_to_invalid_token(message = 'Verification Error')
#   render_error :unauthorized, {
#     status: 401,
#     name: 'Invalid Token',
#     message: message
#   }
# end
