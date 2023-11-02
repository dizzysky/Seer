class Tag < ApplicationRecord
    has_and_belongs_to_many :photos
    validates :name, uniqueness: true

end