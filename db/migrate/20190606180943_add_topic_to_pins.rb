class AddTopicToPins < ActiveRecord::Migration[6.0]
  def change
    add_reference :pins, :topic, null: false, foreign_key: true
  end
end
