class CreatePinMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :pin_messages do |t|
      t.references :user, null: false, foreign_key: true
      t.references :pin, null: false, foreign_key: true
      t.text :message

      t.timestamps
    end
  end
end
