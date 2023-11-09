# app/views/api/albums/index.json.jbuilder
json.array! @albums do |album|
    json.extract! album, :id, :title, :description, :user_id
    cover_photo = album.cover_photo
    if cover_photo&.photo&.attached?
      json.cover_photo_url rails_blob_url(cover_photo.photo, only_path: true)
    else
      json.cover_photo_url nil
    end
  end
  