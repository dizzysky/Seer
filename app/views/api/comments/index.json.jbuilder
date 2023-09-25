json.array! @comments do |comment|
    json.extract! comment, :id, :body, :author_id, :photo_id
    json.created_at comment.created_at.strftime('%Y-%m-%d %H:%M:%S')
    json.updated_at comment.updated_at.strftime('%Y-%m-%d %H:%M:%S')
end