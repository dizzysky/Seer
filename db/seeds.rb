# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# require 'aws-sdk-s3'
require 'open-uri'



# s3 = Aws::S3::Resource.new(
#   region: 'us-east-1'
#   # ,
#   # access_key_id: '***REMOVED***',
#   # secret_access_key: '***REMOVED***'  
# )
# bucket = s3.bucket('seer-seeds')

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password'
    )
  
    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3..15),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end
  
    puts "Done!"


    # puts "Creating example photos..." 

    # first_user = User.first


  

    # example_photos = [
    #   {
    #     caption: 'First example photo', 
    #     uploader_id: first_user.id, 
    #     s3_image_name: '1_honda.jpg'  # Replace with your actual S3 image names
    #   },
    #   {
    #     caption: 'Second example photo', 
    #     uploader_id: first_user.id,
    #     s3_image_name: '2_legend.jpg'
    #   },
    #   {
    #     caption: 'saw this yesterday',
    #     uploader_id: 2, 
    #     s3_image_name: '3_alpina.jpg'
    #   },
    #   {
    #     caption: 'speed of light',
    #     uploader_id: 2, 
    #     s3_image_name: '4_baru.jpg'
    #   },
    #   {
    #     caption: 'how he do that',
    #     uploader_id: 3,
    #     s3_image_name: '5_levin.jpg'
    #   }
    # ]


    # example_photos.each do |photo_data|
    #   photo = Photo.create!(
    #     caption: photo_data[:caption], 
    #     uploader_id: photo_data[:uploader_id], 
    #     album_id: nil, 
    #     created_at: Time.now, 
    #     updated_at: Time.now
    #   )
    
    #   begin
    #     object = bucket.object("cars/#{photo_data[:s3_image_name]}")
    #     temp_file = Tempfile.new
    #     object.get(response_target: temp_file.path)
      
    #     photo.photo.attach(io: temp_file, filename: photo_data[:s3_image_name], content_type: 'image/jpg')
    #   rescue => e
    #     puts "An error occurred: #{e.message}"
    #   ensure
    #     temp_file.close if temp_file
    #     temp_file.unlink if temp_file
    #   end
    # end
    

    # puts "Created example photos!"
  end

  puts "Creating example photos..." 

  first_user = User.first

  second_user = User.find(2)

  third_user = User.find(3)

  photo_1 = Photo.create!(caption: 'First example photo', uploader_id: first_user.id, album_id: nil)
  photo_1.photo.attach(io: URI.open('https://seer-seeds.s3.amazonaws.com/cars/1_honda.jpg'), filename: '1_honda.jpg')
  photo_2 = Photo.create!(caption: 'second example', uploader_id: first_user.id, album_id: nil)
  photo_2.photo.attach(io: URI.open('https://seer-seeds.s3.amazonaws.com/cars/2_legend.jpg'), filename: '2_legend.jpg')
  photo_3 = Photo.create!(caption: 'saw this yesterday', uploader_id: second_user.id, album_id: nil)
  photo_3.photo.attach(io: URI.open('https://seer-seeds.s3.amazonaws.com/cars/3_alpina.jpg'), filename: '3_alpina.jpg')
  photo_4 = Photo.create!(caption: 'speed of light', uploader_id: second_user.id, album_id: nil)
  photo_4.photo.attach(io: URI.open('https://seer-seeds.s3.amazonaws.com/cars/4_baru.jpg'), filename: '4_baru.jpg')
  photo_5 = Photo.create!(caption: 'how he do that', uploader_id: third_user.id, album_id: nil)
  photo_5.photo.attach(io: URI.open('https://seer-seeds.s3.amazonaws.com/cars/5_levin.jpg'), filename: '5_levin.jpg')
  puts "Created example photos!"
  # example_photos = [
  #   {
  #     caption: 'First example photo', 
  #     uploader_id: first_user.id, 
  #     s3_image_name: '1_honda.jpg'  # Replace with your actual S3 image names
  #   },
  #   {
  #     caption: 'Second example photo', 
  #     uploader_id: first_user.id,
  #     s3_image_name: '2_legend.jpg'
  #   },
  #   {
  #     caption: 'saw this yesterday',
  #     uploader_id: 2, 
  #     s3_image_name: '3_alpina.jpg'
  #   },
  #   {
  #     caption: 'speed of light',
  #     uploader_id: 2, 
  #     s3_image_name: '4_baru.jpg'
  #   },
  #   {
  #     caption: 'how he do that',
  #     uploader_id: 3,
  #     s3_image_name: '5_levin.jpg'
  #   }
  # ]


  # example_photos.each do |photo_data|
  #   photo = Photo.create!(
  #     caption: photo_data[:caption], 
  #     uploader_id: photo_data[:uploader_id], 
  #     album_id: nil, 
  #     created_at: Time.now, 
  #     updated_at: Time.now
  #   )
  
  #   begin
  #     object = bucket.object("cars/#{photo_data[:s3_image_name]}")
  #     temp_file = Tempfile.new
  #     object.get(response_target: temp_file.path)
    
  #     photo.photo.attach(io: temp_file, filename: photo_data[:s3_image_name], content_type: 'image/jpg')
  #   rescue => e
  #     puts "An error occurred: #{e.message}"
  #   ensure
  #     temp_file.close if temp_file
  #     temp_file.unlink if temp_file
  #   end
  # end
  

 



  # Bench.first(3).each_with_index do |bench, index|
  #   bench.photo.attach(
  #     # The string passed to URI.open should be the URL of the image in its bucket.
  #     # This sample assumes the bucket name is `benchbnb-seeds`.
  #     io: URI.open("https://benchbnb-seeds.s3.amazonaws.com/bench_#{index + 1}.jpg"), 
  #     filename: "bench_#{index + 1}.jpg"
  #   )
  # end

    # Photo.create([
    #   {
    #     caption: 'First example photo', 
    #     uploader_id: first_user.id, 
    #     album_id: nil, 
    #     created_at: Time.now, 
    #     updated_at: Time.now
    #   },
    #   {
    #     caption: 'Second example photo', 
    #     uploader_id: first_user.id, 
    #     album_id: nil, 
    #     created_at: Time.now, 
    #     updated_at: Time.now
    #   },
    #   {caption: 'saw this yesterday',
    #     uploader_id: 2,
    #     album_id: nil,
    #     created_at: Time.now,
    #     updated_at: Time.now
    #   },
    #   {caption: 'very sleepy',
    #     uploader_id: 2, 
    #     album_id: nil, 
    #     created_at: Time.now,
    #     updated_at: Time.now
    #   },
    #   {caption: 'view from hell',
    #     uploader_id: 3,
    #     album_id: nil, 
    #     created_at: Time.now,
    #     updated_at: Time.now
    #   }
    # ])