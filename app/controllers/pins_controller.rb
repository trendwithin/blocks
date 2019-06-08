class PinsController < ApplicationController

  def new
    @pin = Pin.new
  end

  def pinned_locations
    @recently_pinned_locations = LocalPinsService.new.proximity_pins
  end
end
