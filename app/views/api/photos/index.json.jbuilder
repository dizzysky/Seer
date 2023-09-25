json.array! @photos do |photo|
    json.extract! photo, :id, :caption, :uploader_id, :album_id, :created_at, :updated_at
    json.username photo.uploader.username
end