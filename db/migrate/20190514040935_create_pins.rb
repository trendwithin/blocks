class CreatePins < ActiveRecord::Migration[6.0]
  def change
    create_table :pins do |t|
      t.references :user, null: false, foreign_key: true
      t.string :geolocation_lat, null: false
      t.string :geolocation_lng, null: false

      t.timestamps
    end
  end
end
