class CreateAlbums < ActiveRecord::Migration[7.0]
  def change
    create_table :albums do |t|
      t.string :title
      t.text :description
      t.references :user, null: false, foreign_key: true
      t.integer :cover_photo_id

      t.timestamps
    end
  end
end
