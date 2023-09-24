class Api::PhotosController < ApplicationController

    def index 
        @photos = Photo.all
        render :index 
    end

    def show 
        photo = Photo.find(params[:id])
        render json: photo
    end



end