require 'json'
require 'open-uri'
require 'date'
class PostsController < ApplicationController
before_action :parse_posts

  def create
    create_posts
    create_images
  end

private

  def create_posts
    @post = Post.create(user_id: current_user.id)
    unix_time = @posts["data"][0]["created_time"].to_i
    @post[:date] = Time.at(unix_time).to_datetime
    @post[:ig_id] = @posts["data"][0]["id"]
    @post[:text] = @posts["data"][0]["caption"]["text"]
    @post[:lat] = @posts["data"][0]["location"]["latitude"]
    @post[:lng] = @posts["data"][0]["location"]["longitude"]
    @post[:restaurant_name] = @posts["data"][0]["location"]["name"]
    @post.save
  end

  def create_images
    if @posts["data"][0]["images"].class == Array
      @posts["data"][0]["images"].each do |element|
        image = Image.create(post_id: @post.id)
        image["url"] = element["standard_resolution"]["url"]
        image.save
        end
    else
      image = Image.create(post_id: @post.id)
      image[:url] = @posts["data"][0]["images"]["standard_resolution"]["url"]
      image.save
    end
  end


  def parse_posts
    url ="https://api.instagram.com/v1/users/self/media/recent/?access_token=" + ENV['INSTAGRAM_ACCESS_TOKEN']
    posts_serialized = open(url).read
    @posts = JSON.parse(posts_serialized)
  end
end
