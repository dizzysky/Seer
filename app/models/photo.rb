class Photo < ApplicationRecord
  has_one_attached :photo
  belongs_to :uploader, class_name: 'User', foreign_key: 'uploader_id'
  has_many :comments
end
