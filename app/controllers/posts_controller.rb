require 'json'
require 'open-uri'
require 'date'
class PostsController < ApplicationController
before_action :parse_posts

  def create
    create_posts
  end

private

  def create_posts
    @posts["data"].each_with_index do |element, index|

      if element["location"] != nil
        @post = Post.create(user_id: current_user.id)
        @post[:ig_id] = element["id"]
        unix_time = element["created_time"].to_i
        @post[:date] = Time.at(unix_time).to_datetime
        @post[:text] = element["caption"]["text"]
        @post[:lat] = element["location"]["latitude"]
        @post[:lng] = element["location"]["longitude"]
        @post[:restaurant_name] = element["location"]["name"]
        @post.save
        create_images(index)
      end
    end

  end

  def create_images(index)

    if @posts["data"][index]["images"].class == Array
      @posts["data"][index]["images"].each do |element|
        image = Image.create(post_id: @post.id)
        image["url"] = element["standard_resolution"]["url"]
        image.save
        end
    else
      image = Image.create(post_id: @post.id)
      image[:url] = @posts["data"][index]["images"]["standard_resolution"]["url"]
      image.save
    end
  end


  def parse_posts
    url ="https://api.instagram.com/v1/users/self/media/recent/?access_token=" + ENV['INSTAGRAM_ACCESS_TOKEN']
    posts_serialized = open(url).read
    @posts = JSON.parse(posts_serialized)
  end
end
