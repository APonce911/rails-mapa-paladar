class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :privacypolicy]
  # before_action :set_user

  def home

    # @client = Instagram.client(:access_token => session[:access_token])
    # @response = @client.user_recent_media

    # @instagram = Instagram.user_recent_media(ENV['INSTAGRAM_CLIENT_ID'], {:count => 1})
  end

  # def set_user
  #   @user =
  # end
end
