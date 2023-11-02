# {"id"=>3, "caption"=>"First example photo", "uploader_id"=>1, "album_id"=>nil, "created_at"=>Fri, 22 Sep 2023 17:54:17.916775000 UTC +00:00, "updated_at"=>Fri, 22 Sep 2023 17:54:17.916776000 UTC +00:00, "username"=>"Demo-lition"}

json.extract! @photo, :id, :caption, :uploader_id, :album_id, :created_at, :updated_at
json.username @photo.uploader.username
json.photoUrl url_for(@photo.photo) if @photo.photo.attached?

json.tags @photo.tags do |tag| 
    json.partial! 'api/tags/tag', tag: tag
end


# json.photo do
#     json.extract! @photo, :id, :caption, :uploader_id, :album_id, :created_at, :updated_at
# end

# json.uploader do
#     json.extract! @photo.uploader, :id, :username, :email, :first_name, :last_name
# end


# json.comments for later