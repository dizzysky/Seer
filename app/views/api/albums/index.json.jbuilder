json.array! @albums do |album|
    json.extract! album, :id, :title, :description, :user_id
end

