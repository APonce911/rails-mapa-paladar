
class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :privacypolicy]

  def home

  end

private

  def parse_comments(post_id)
    url = "https://api.instagram.com/v1/media/" + post_id + "/comments?access_token=" + ENV['INSTAGRAM_ACCESS_TOKEN']
    comments_serialized = open(url).read
    comments = JSON.parse(comments_serialized)

    puts "# ===============================DATA START==========================="
    puts comments
    puts "# ===============================DATA END============================="

    return comments
  end
end
