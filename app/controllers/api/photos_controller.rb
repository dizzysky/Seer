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
    
      # Begin with updating tags if provided
      update_tags(@photo, params[:tag_names]) if params[:tag_names].present?
    
      # Update photo attributes if they are provided
      if params[:photo].present? && @photo.update(photo_params)
        render :show
      elsif params[:photo].present?
        # If :photo was provided but the update failed, send back the error messages
        render json: @photo.errors.full_messages, status: :unprocessable_entity
      else
        # If :photo wasn't provided, we assume it was just a tag update
        render :show
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


    def remove_tag
      @photo = Photo.find(params[:photo_id])
      @tag = Tag.find(params[:tag_id])
      if @photo.tags.delete(@tag)
        render json: { message: 'Tag removed successfully' }, status: :ok
      else
        render json: { errors: 'Tag could not be removed' }, status: :unprocessable_entity
      end
    end


    def add_tag
      @photo = Photo.find(params[:photo_id])
      tag = Tag.find_or_create_by(name: params[:tag_name])
  
      if @photo.tags << tag
        render json: { message: 'Tag added successfully' }, status: :ok
      else
        render json: { errors: 'Tag could not be added' }, status: :unprocessable_entity
      end
    end

    def search
      query = params[:query]
      @photos = Photo.search(query)
      render json: @photos # Adjust according to your needs
    end
  

    private

  def photo_params
    # Check if the photo is present and not just an empty hash
    if params[:photo].present? && !params[:photo].empty?
      params.require(:photo).permit(:photo, :image, :caption, :uploader_id, tag_ids: [])
    else
      params.permit(:caption, :uploader_id, tag_ids: [])
    end
  end



    def tag_params
      params.permit(tag_names: [])
    end

    def update_tags(photo, tag_names)
      photo.tags.clear
      tag_names.each do |name|
        tag = Tag.find_or_create_by(name: name) 
        photo.tags << tag unless photo.tags.include?(tag)
      end
    end


   

end