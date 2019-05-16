class PinsController < ApplicationController
  def pinned_locations
    @recently_pinned_locations = LocalPinsService.new.proximity_pins
  end
end
