json.extract! @album, :id, :title, :description, :user_id
json.photo_ids @album.photos.ids
