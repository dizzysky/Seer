class CreatePhotos < ActiveRecord::Migration[6.0]
  def change
    create_table :photos do |t|
      t.string :caption
      t.references :uploader, index: true, foreign_key: { to_table: :users }
      t.bigint :album_id

      t.timestamps
    end
  end
end
