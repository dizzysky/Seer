json.extract! tag, :id, :name 
json.photos tag.photos.map(&:id) 