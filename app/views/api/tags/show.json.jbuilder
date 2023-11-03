json.id @tag.id
json.name @tag.name
json.photos @tag.photos do |photo|
    json.(photo, :id, :caption, :uploader_id, :created_at)
end