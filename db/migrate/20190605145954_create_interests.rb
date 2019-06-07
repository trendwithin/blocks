class CreateInterests < ActiveRecord::Migration[6.0]
  def change
    create_table :interests do |t|
      t.string :curiosity, null: false

      t.timestamps
    end
    add_index :interests, :curiosity, unique: true
  end
end
