@photos.each do |photo|
    json.set! photo.id do
    json.extract! photo, :id, :caption, :uploader_id, :created_at, :updated_at
    json.username photo.uploader.username
    json.photoUrl photo.photo.attached? ? url_for(photo.photo) : nil
    end
end