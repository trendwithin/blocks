class PagesController < ApplicationController
  before_action :authenticate_user!, except: [:landing]

  def home
    ip = request.location
    @user = User.first
  end

  def landing
  end

  def main
    token ||= JwtService.encode({user_id: current_user.id, token_initialized: Time.now })
    @value = "#{token}"
  end
end
