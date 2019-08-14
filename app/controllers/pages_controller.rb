class PagesController < ApplicationController
  before_action :authenticate_user!
  def home
    ip = request.location
    @user = User.first
  end

  def main
    token ||= JwtService.encode({user_id: current_user.id, token_initialized: Time.now })
    @value = "#{token}"
  end
end
