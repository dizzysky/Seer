class Api::SessionsController < ApplicationController
  def show

    if current_user
      @user = current_user
      render 'api/users/show'
      # render json: @user.as_json(only: [:username, :id, :email])

    else
      render json: {user: nil}
    end
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])

    if @user
      login!(@user)
      render 'api/users/show'
      # render json: @user.as_json(only: [:username, :id, :email])
    else
      render json: { errors: ['The provided credentials were invalid.']}, 
        status: :unauthorized
    end
  end

  def destroy
    logout!
    render json: {message: 'success'}
  end
end