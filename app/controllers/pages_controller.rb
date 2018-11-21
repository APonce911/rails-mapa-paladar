
class PagesController < ApplicationController
  
  skip_before_action :authenticate_user!, only: [:home, :privacypolicy, :components]

  def home

    @posts = Post.all.to_json.html_safe
    # como a tabela de images esta na mesma ordem dos posts, e nenhum post tem duas imagens podemos entregar o Image.all sem ter que fazer um query
    @images = Image.all.to_json.html_safe
    @users = User.all.to_json.html_safe
  end

  def privacypolicy
  end


end
