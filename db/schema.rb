# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_09_172233) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "interests", force: :cascade do |t|
    t.string "curiosity", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["curiosity"], name: "index_interests_on_curiosity", unique: true
  end

  create_table "pin_messages", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "pin_id", null: false
    t.text "message"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["pin_id"], name: "index_pin_messages_on_pin_id"
    t.index ["user_id"], name: "index_pin_messages_on_user_id"
  end

  create_table "pins", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.float "latitude", null: false
    t.float "longitude", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "topic_id", null: false
    t.index ["topic_id"], name: "index_pins_on_topic_id"
    t.index ["user_id"], name: "index_pins_on_user_id"
  end

  create_table "topics", force: :cascade do |t|
    t.string "subject", null: false
    t.bigint "interest_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["interest_id"], name: "index_topics_on_interest_id"
    t.index ["subject"], name: "index_topics_on_subject", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "pin_messages", "pins"
  add_foreign_key "pin_messages", "users"
  add_foreign_key "pins", "topics"
  add_foreign_key "pins", "users"
  add_foreign_key "topics", "interests"
end
