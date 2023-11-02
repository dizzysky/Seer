class Api::PhotosController < ApplicationController
    def index 
        @photos = Photo.all
        render :index 
    end

    def show 
        Rails.logger.info "PARAAAMS: #{params.inspect}"
        @photo = Photo.includes(:tags).find(params[:id])
        render :show
    end



    def create
      @photo = Photo.new(photo_params.except(:tag_ids))
      @photo.uploader_id = current_user.id
    
      if @photo.save
        if params[:tag_ids]
          # Assuming params[:tag_ids] is a string of comma-separated tag names
          tag_names = params[:tag_ids].split(',')
          tag_names.each do |name|
            tag = Tag.find_or_create_by(name: name.strip)
            @photo.tags << tag
          end
        end
        render json: { id: @photo.id }, status: :created
      else
        render json: @photo.errors, status: :unprocessable_entity
      end
    end
    
  


    def edit 
        @photo = Photo.find(params[:id])
    end

    def update
        @photo = Photo.find(params[:id])
      
        if @photo.update(photo_params)
          @photo.tag_ids = params[:tag_ids] if params[:tag_ids]
          render json: @photo
        else
          render json: @photo.errors.full_messages, status: 422
        end
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