class CreateTodayPhotos < ActiveRecord::Migration[7.0]
  def change
    create_table :today_photos do |t|
      t.references :photo, null: false

      t.timestamps
    end
  end
end
