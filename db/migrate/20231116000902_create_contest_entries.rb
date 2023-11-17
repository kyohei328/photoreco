class CreateContestEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :contest_entries do |t|
      t.references :user, foreign_key: true
      t.references :contest, foreign_key: true
      t.references :photo, foreign_key: true

      t.timestamps
    end
  end
end
