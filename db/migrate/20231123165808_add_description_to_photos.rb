class AddDescriptionToPhotos < ActiveRecord::Migration[7.0]
  def change
    add_column :photos, :camera_make, :string
    add_column :photos, :lens_make, :string
  end
end
