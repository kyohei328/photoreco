class CreatePhotos < ActiveRecord::Migration[7.0]
  def change
    create_table :photos do |t|
      t.string :title, null: false
      t.text :description
      t.float :gps_latitude
      t.float :gps_longitude
      t.string :camera
      t.string :lens
      t.integer :ISO_sensitivity
      t.string :shutter_speed
      t.integer :exposure_compensation
      t.integer :aperture
      t.string :focal_length
      t.string :white_balance
      t.string :shooting_mode
      t.string :image_size_width
      t.string :image_size_height
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
