require 'open-uri'

class PostsController < ApplicationController
  before_action :parse_posts

  def create
    create_posts
  end

private

  def create_posts
    @posts["data"].each_with_index do |element, index|
      if element["location"] != nil
        # ==============google places parse test
        parse_place_type(element["location"]["name"], element["location"]["latitude"], element["location"]["longitude"])
        # ==============end of test============
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
        create_comments(@post[:ig_id])

      end
    end
    puts "============================import complete======================"
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

  def create_comments(ig_id)
    parse_comments(ig_id)
    @comments["data"].each do |element|
      if element["from"] != nil
        @comment = Comment.create(post_id: @post.id)
        @comment[:nickname] = element["from"]["username"]
        @comment[:text] = element["text"]
        @comment.save
      end
    end
  end

  def parse_comments(post_id)
    url = "https://api.instagram.com/v1/media/" + post_id + "/comments?access_token=" + @env
    comments_serialized = open(url).read
    @comments = JSON.parse(comments_serialized)
  end

  def parse_posts

    define_env
    url ="https://api.instagram.com/v1/users/self/media/recent/?access_token=" + @env
    posts_serialized = open(url).read
    @posts = JSON.parse(posts_serialized)
  end

  def parse_place_type(name,lat,lng)
  # url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?" + name + "&inputtype=textquery&fields=name,type&key=" + ENV['GOOGLEMAPS_API_KEY']
  # url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat.to_s+","+lng.to_s+"&fields=name,type&key=" + ENV['GOOGLEMAPS_API_KEY']
  # this is working https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-23.55704,-46.688&radius=1&keyword=high%20line%20bar&key=
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat.to_s+","+lng.to_s+"&radius=1&keyword="+name+"&key="+ENV['GOOGLEMAPS_API_KEY']
    url = url.gsub(" ", "%20")
  # estou tendo erro no ã quando vou parsear a string acima
    puts "==================================================================="
    puts(url)
    infos_serialized = open(url).read
    puts infos_serialized
    raise
    @infos = JSON.parse(infos_serialized)
    puts @infos
  end

  def define_env
      if current_user.email == "airton_p@mapa.com"
        @env = ENV['INSTAGRAM_ACCESS_TOKEN']
      else
        @env = ENV['INSTAGRAM_ACCESS_TOKEN_SAMPLE']
      end
  end

end
