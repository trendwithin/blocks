class CreatePins < ActiveRecord::Migration[6.0]
  def change
    create_table :pins do |t|
      t.references :user, null: false, foreign_key: true
      t.float :latitude, null: false
      t.float :longitude, null: false

      t.timestamps
    end
  end
end
