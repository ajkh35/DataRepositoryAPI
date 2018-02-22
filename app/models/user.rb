class User < ApplicationRecord
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable
  include DeviseTokenAuth::Concerns::User

  validates :email, :presence => true, :uniqueness => true
  validates :password, :presence => true,
            :confirmation => true,
            :length => {:within => 6..40},
            :on => :create
end
