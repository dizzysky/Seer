class Album < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :photos

  def cover_photo 
    photos.first
  end
end
