class Api::TagsController < ApplicationController 

    def index
        @tags = Tag.all
        render :index 
    end

    def create
        @tag = Tag.new(tag_params) 
        if @tag.save
            render :show
        else 
            render json: @tag.errors.full_messages, status: 422 
        end
    end

    def show
        @tag = Tag.find(params[:id])
        @photos = @tag.photos # Assuming there's a has_many association set up
        render :show
    end

    private 

    def tag_params
        params.require(:tag).permit(:name) 
    end
    
end