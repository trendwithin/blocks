class JwtService

  def self.encode(payload, expiration = 1)
    @expiration ||= expiration
    payload = payload.dup
    payload[:exp] = @expiration.to_i.days.from_now.to_i
    JWT.encode(payload, Rails.application.secrets.secret_key_base, 'HS256')
  end

  def self.decode(token)
    decoded_token = JWT.decode token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256'
    decoded_token.first
  end
end
