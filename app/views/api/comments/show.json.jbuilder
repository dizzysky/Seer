json.extract! @comment, :id, :body, :author_id, :photo_id
json.authorUsername @comment.author.username
json.created_at @comment.created_at.strftime('%Y-%m-%d')
json.updated_at @comment.updated_at.strftime('%Y-%m-%d %H:%M:%S')
