class CreateVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :votes do |t|
      t.integer :rate, null: false
      t.text :comment
      t.references :user, foreign_key: true
      t.references :contest, foreign_key: true
      t.references :photo, foreign_key: true

      t.timestamps
    end
  end
end
