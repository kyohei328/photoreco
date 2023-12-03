class CreateContestResults < ActiveRecord::Migration[7.0]
  def change
    create_table :contest_results do |t|
      t.references :user, foreign_key: true
      t.references :contest, foreign_key: true
      t.references :photo, foreign_key: true
      t.integer :award, default: 0, null: false
      t.timestamps
    end
  end
end
