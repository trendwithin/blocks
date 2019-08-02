class JwtService

  def self.encode(payload, expiration = nil)
    payload = payload.dup
    payload[:exp] = expiration.to_i.hours.from_now.to_i
    JWT.encode(payload, Rails.application.secrets.secret_key_base, 'HS256')
  end

  def self.decode(token)
    body, = JWT.decode(token, Rails.application.secrets.secret_key_base,
                       true, algorithm: 'HS256')
    HashWithIndifferentAccess.new(body)
   rescue JWT::ExpiredSignature
     nil
  end
end
