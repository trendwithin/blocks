class PagesController < ApplicationController
  def home
    ip = request.location
  end
end
