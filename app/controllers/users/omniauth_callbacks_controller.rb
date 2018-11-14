class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def instagram
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if @user.new_record?
      @user.save
      session[:user_return_to] = root_path
    end
    sign_in_and_redirect @user, event: :authentication # this will throw if @user is not activated
    set_flash_message(:notice, :success, kind: "instagram") if is_navigational_format?
  end

  def failure
    redirect_to root_path
  end

end
