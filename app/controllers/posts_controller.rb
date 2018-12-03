require 'open-uri'

class PostsController < ApplicationController

  def create
    parse_posts
    create_posts
    redirect_to root_path
  end

  private

  def create_posts
    @posts["data"].each_with_index do |element, index|
    # Post.all.each_with_index do |element, index|
      if element["location"] != nil
        if is_restaurant?(element["location"]["name"], element["location"]["latitude"], element["location"]["longitude"])
        #'==============google places parse test'
        # puts is_restaurant?(element["location"]["name"], element["location"]["latitude"], element["location"]["longitude"])
        # puts is_restaurant?(element[:restaurant_name], element[:lat], element[:lng])
        # '==============end of test============'

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

  def is_restaurant?(name,lat,lng)
    # this is working https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-23.55704,-46.688&radius=1&keyword=high%20line%20bar&key=
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat.to_s+","+lng.to_s+"&radius=10&keyword="+name+"&key="+ENV['GOOGLEMAPS_API_PLACES_KEY']
    infos_serialized = scrape(url)
    infos = JSON.parse(infos_serialized)

    if infos["results"] == []
      types = []
    else
      types = infos["results"][0]["types"]
    end

    accepted_types = ['bar', 'bakery', 'cafe', 'food','restaurant', 'meal_takeaway', 'supermarket']
    result = (types & accepted_types).any?
    return result
  end

  def scrape(url)
    begin
      uri = URI.parse(url)
    rescue URI::InvalidURIError
      uri = URI.parse(URI.escape(url))
    end
    result = open(uri).read

    return result
  end

  def is_new?(ig_id)
    result = Post.selec
    return result
  end

  def define_env
      if current_user.email == "airton_p@mapa.com"
        @env = ENV['INSTAGRAM_ACCESS_TOKEN']
      elsif current_user.email == "sample_profile02@mapa.com"
        @env = ENV['INSTAGRAM_ACCESS_TOKEN_SAMPLE2']
      else
        @env = ENV['INSTAGRAM_ACCESS_TOKEN_SAMPLE']
      end
  end
end
