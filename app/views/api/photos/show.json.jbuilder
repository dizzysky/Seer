json.extract! @photo, :id, :caption, :uploader_id, :created_at, :updated_at
json.username @photo.uploader.username
json.photoUrl url_for(@photo.photo) if @photo.photo.attached?

json.tags @photo.tags do |tag| 
    json.partial! 'api/tags/tag', tag: tag
end