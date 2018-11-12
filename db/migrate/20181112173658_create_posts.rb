class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.references :user
      t.datetime :date
      t.string :text
      t.string :restaurant_name
      t.float :lat
      t.float :lng

      t.timestamps
    end
  end
end
