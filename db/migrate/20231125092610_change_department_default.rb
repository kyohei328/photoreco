class ChangeDepartmentDefault < ActiveRecord::Migration[7.0]
  def up
    change_column :contests, :department, :string, default: 'キレイ部門'
  end

  def down
    change_column :contests, :department, :integer, default: 0
  end
end
