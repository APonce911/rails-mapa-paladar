class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :omniauthable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauth_providers => [:instagram]

def self.from_omniauth(auth)
puts  "======================================================================"
puts auth
puts  "======================================================================"
  where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
    user.email = auth.info.nickname + "@mapa.com"
    user.avatar = auth.info.image
    user.password = Devise.friendly_token[0, 20]

    # user.name = auth.info.name   # assuming the user model has a name
    # If you are using confirmable and the provider(s) you use validate emails,
    # uncomment the line below to skip the confirmation emails.
    # user.skip_confirmation!
  end
end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.instagram_data"] && session["devise.instagram_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end

end
