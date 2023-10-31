class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :password_digest 
      t.string :name
      t.string :email, null: false
      t.text :self_introduction
      t.string :uid, null: false, default: ""

      t.timestamps

      t.index :uid, unique: true 
    end
    add_index :users, :email, unique: true
  end
end