class Post < ApplicationRecord
  has_many :images, dependent: :delete_all

  has_many :comments, dependent: :delete_all

  belongs_to :user
end
