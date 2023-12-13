# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_11_30_151824) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "contest_entries", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "contest_id"
    t.bigint "photo_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["contest_id"], name: "index_contest_entries_on_contest_id"
    t.index ["photo_id"], name: "index_contest_entries_on_photo_id"
    t.index ["user_id"], name: "index_contest_entries_on_user_id"
  end

  create_table "contest_results", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "contest_id"
    t.bigint "photo_id"
    t.integer "award", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["contest_id"], name: "index_contest_results_on_contest_id"
    t.index ["photo_id"], name: "index_contest_results_on_photo_id"
    t.index ["user_id"], name: "index_contest_results_on_user_id"
  end

  create_table "contests", force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.date "start_date"
    t.date "end_date"
    t.date "result_date"
    t.string "entry_conditions", null: false
    t.string "department", default: "キレイ部門"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_contests_on_user_id"
  end

  create_table "likes", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "photo_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["photo_id"], name: "index_likes_on_photo_id"
    t.index ["user_id", "photo_id"], name: "index_likes_on_user_id_and_photo_id", unique: true
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "photos", force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.float "gps_latitude"
    t.float "gps_longitude"
    t.string "camera"
    t.string "lens"
    t.integer "ISO_sensitivity"
    t.string "shutter_speed"
    t.integer "exposure_compensation"
    t.integer "aperture"
    t.string "focal_length"
    t.string "white_balance"
    t.string "shooting_mode"
    t.string "image_size_width"
    t.string "image_size_height"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "camera_make"
    t.string "lens_make"
    t.index ["user_id"], name: "index_photos_on_user_id"
  end

  create_table "today_photos", force: :cascade do |t|
    t.bigint "photo_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["photo_id"], name: "index_today_photos_on_photo_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "password_digest"
    t.string "name"
    t.string "email", null: false
    t.text "self_introduction"
    t.string "uid", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["uid"], name: "index_users_on_uid", unique: true
  end

  create_table "votes", force: :cascade do |t|
    t.integer "rate", null: false
    t.text "comment"
    t.bigint "user_id"
    t.bigint "contest_id"
    t.bigint "photo_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["contest_id"], name: "index_votes_on_contest_id"
    t.index ["photo_id"], name: "index_votes_on_photo_id"
    t.index ["user_id"], name: "index_votes_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "contest_entries", "contests"
  add_foreign_key "contest_entries", "photos"
  add_foreign_key "contest_entries", "users"
  add_foreign_key "contest_results", "contests"
  add_foreign_key "contest_results", "photos"
  add_foreign_key "contest_results", "users"
  add_foreign_key "contests", "users"
  add_foreign_key "likes", "photos"
  add_foreign_key "likes", "users"
  add_foreign_key "photos", "users"
  add_foreign_key "votes", "contests"
  add_foreign_key "votes", "photos"
  add_foreign_key "votes", "users"
end
