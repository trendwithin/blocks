class LocalPinsService
  attr_reader :recent_pins
  def initialize
    @recent_pins = Pin.created_at_within_hour
  end

  def proximity_pins
    return nil if recent_pins.empty?
    recent_pins
  end
end
