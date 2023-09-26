json.array! @photos do |photo|
    json.extract! photo, :id, :caption, :uploader_id, :album_id, :created_at, :updated_at
    json.username photo.uploader.username
    json.photoUrl photo.photo.attached? ? url_for(photo.photo) : nil
end