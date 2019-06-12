class PagesController < ApplicationController
  def home
    ip = request.location
    @user = User.first
  end
end
