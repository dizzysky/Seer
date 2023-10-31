class Api::AlbumsController < ApplicationController 

    def index 
        @albums = current_user.albums
        render :index
    end


    def show
        @album = Album.find(params[:id])
        render :show
    end


    def create
        @album = Album.new(album_params)
        @album.user = current_user

        if @album.save
            render :show, status: :created 
        else
            render json: @album.errors, status: :unprocessable_entity
        end
    end


    def update 
        @album = Album.find(params[:id])

        if @album.update(album_params) 
            render :show
        else 
            render json: @album.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @album = Album.find(params[:id]) 
        @album.destroy
        render json: { message: "Album deleted successfully"}, status: :ok
    end


    private 

    def album_params 
        params.require(:album).permit(:name, :description, :user_id, :cover_photo_id)
    end

end