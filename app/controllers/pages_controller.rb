
class PagesController < ApplicationController
  # PLEASE DELETE LINE 3 & 4 FOR  PRODUCTION
	# skip_before_action :authenticate_user!, only: [:home]  

  skip_before_action :authenticate_user!, only: [:home, :privacypolicy]

  def home

    @posts = Post.all.to_json.html_safe
    # como a tabela de images esta na mesma ordem dos posts, e nenhum post tem duas imagens podemos entregar o Image.all sem ter que fazer um query
    @images = Image.all.to_json.html_safe
    @users = User.all.to_json.html_safe
  end

  def privacypolicy
  end


end
