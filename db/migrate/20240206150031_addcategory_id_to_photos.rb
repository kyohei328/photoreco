class AddcategoryIdToPhotos < ActiveRecord::Migration[7.0]
  def up
    add_reference :photos, :category, foreign_key: true
  end

  def down
    remove_reference :photos, :category, foreign_key: true
  end
end
