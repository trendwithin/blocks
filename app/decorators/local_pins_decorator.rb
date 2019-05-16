class LocalPinsDecorator < SimpleDelegator
  attr_reader :obj
  def initialize obj
    @obj = obj
  end

  def view_partial
    if obj.nil?
      'pins/no_located_pins'
    else
      'pins/located_pins'
    end
  end
end
