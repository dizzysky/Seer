class CreateTags < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.string :name, null: false
      t.timestamps
    end


    create_table :photos_tags, id: false do |t|
      t.bigint :photo_id, null: false
      t.bigint :tag_id, null: false
    end


    add_index :tags, :name, unique: true 
    add_index :photos_tags, [:photo_id, :tag_id], unique: true
  end
end
