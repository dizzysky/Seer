json.array! @albums do |album|
    json.extract! album, :id, :name, :description, :user_id, :cover_photo_id
end



