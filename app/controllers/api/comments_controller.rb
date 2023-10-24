class Api::CommentsController < ApplicationController
    before_action :require_logged_in
  
    # comments_controller.rb
    def index
      @comments = Comment.includes(:author).where(photo_id: params[:photo_id])
      render :index
    end

  
    def create
      @comment = Comment.new(comment_params)
      @comment.author_id = current_user.id
      @comment.photo_id = params[:photo_id]
  
      if @comment.save
        render :show
      else
        render json: @comment.errors.full_messages, status: 422
      end
    end


    def update
      @comment = Comment.find(params[:id])

      if @comment.update(comment_params)
        render :show
      else
        render json: @comment.errors.full_messages, status: 422 # Unprocessable Entity
      end
    end

  
    def destroy
      @comment = Comment.find_by(id: params[:id])
  
      if @comment.nil?
          render json: ['Comment not found'], status: 404
          return
      end
  
      if @comment.author_id == current_user.id
          if @comment.destroy
              render :show
          else
              render json: @comment.errors.full_messages, status: 422 # Unprocessable Entity
          end
      else
          render json: ['You do not have permission to delete this comment'], status: 403
      end
  end
  
    private
    def comment_params
        params.require(:comment).permit(:body)
    end
end
  