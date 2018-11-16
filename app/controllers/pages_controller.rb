
class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :privacypolicy]

  def home
    @posts = Post.all.to_json.html_safe
  end


end
