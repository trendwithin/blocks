class CreateTopics < ActiveRecord::Migration[6.0]
  def change
    create_table :topics do |t|
      t.string :subject, null: false, unique: true
      t.references :interest, null: false, foreign_key: true

      t.timestamps
    end
    add_index :topics, :subject, unique: true
  end
end
