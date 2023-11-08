class CreateContests < ActiveRecord::Migration[7.0]
  def change
    create_table :contests do |t|
      t.string :title, null: false
      t.text :description
      t.date :start_date
      t.date :end_date
      t.date :result_date
      t.string :entry_conditions, null: false
      t.integer :department, default: 0
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
