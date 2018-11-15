class AddColumnToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :ig_id, :string
  end
end
