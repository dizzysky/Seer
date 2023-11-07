json.extract! @tag, :id, :name
json.photos do
  json.array! @tag.photos do |photo|
    json.extract! photo, :id, :caption
    json.url url_for(photo.photo) if photo.photo.attached?
  end
end