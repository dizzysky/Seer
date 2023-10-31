class Api::PhotosController < ApplicationController
    def index 
        @photos = Photo.all
        render :index 
    end

    def show 
        Rails.logger.info "Params: #{params.inspect}"
        @photo = Photo.find(params[:id])
        render :show
    end



    def create
        @photo = Photo.new(photo_params)
        @photo.uploader_id = current_user.id
        
        if @photo.save
        render json: { id: @photo.id }, status: :created
        else
        render json: @photo.errors, status: :unprocessable_entity
        end

        @photo.tag_ids = params[:tag_ids] if params[:tag_ids]
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
        @photo.tag_ids = params[:tag_ids] if params[:tag_ids]
    end



    def destroy
        @photo = Photo.find(params[:id])
        if @photo.destroy
        render json: { id: params[:id], message: 'Photo deleted successfully' }
        else
        render json: { errors: @photo.errors.full_messages }, status: :unprocessable_entity
        end
    end
  

    private

    def photo_params 
        params.require(:photo).permit(:photo, :caption, :uploader_id, :album_id, tag_ids: []) 
    end

end