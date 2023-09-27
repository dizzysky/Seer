class Api::PhotosController < ApplicationController

    def index 
        @photos = Photo.all
        render :index 
    end

    def show 
        @photo = Photo.find(params[:id])
        render :show
        # username = photo.uploader.username # Assuming 'uploader' is an association
        # photo_data = photo.attributes.merge("username" => username)
        # debugger
        # render json: photo_data
    end

    def create

        @photo = Photo.new(photo_params)

        @photo.uploader_id = current_user.id
        if @photo.save
          render json: { message: 'Photo successfully uploaded' }, status: 200
        else
          render json: { errors: @photo.errors.full_messages }, status: 400
        end
      end
      


    def edit 
        @photo = Photo.find(params[:id])
    end

    def update
        @photo = Photo.find(params[:id])

        if @photo.update(photo_params)
            render json: @photo
        else
            render json: @photo.errors.full_messages, status: 422
        end
    end


    def destroy 
        @photo = Photo.find(params[:id])
        @photo.destroy

    end

    private

    def photo_params 
        params.require(:photo).permit(:photo, :caption, :uploader_id, :album_id) 
    end

end