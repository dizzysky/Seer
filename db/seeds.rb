# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'open-uri'

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
      username: 'demo_user', 
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
  end

  puts "Creating example photos..." 

  first_user = User.first
  second_user = User.find(2)
  third_user = User.find(3)
  fourth_user = User.find(4)
  fifth_user = User.find(5)

  photo_1 = Photo.create!(caption: 'First example photo', uploader_id: first_user.id)
  photo_1.photo.attach(io: URI.open('https://seer-seeds.s3.amazonaws.com/cars/1_honda.jpg'), filename: '1_honda.jpg')
  photo_2 = Photo.create!(caption: 'second example', uploader_id: first_user.id)
  photo_2.photo.attach(io: URI.open('https://seer-seeds.s3.amazonaws.com/cars/2_legend.jpg'), filename: '2_legend.jpg')
  photo_3 = Photo.create!(caption: 'saw this yesterday', uploader_id: second_user.id)
  photo_3.photo.attach(io: URI.open('https://seer-seeds.s3.amazonaws.com/cars/3_alpina.jpg'), filename: '3_alpina.jpg')
  photo_4 = Photo.create!(caption: 'speed of light', uploader_id: second_user.id)
  photo_4.photo.attach(io: URI.open('https://seer-seeds.s3.amazonaws.com/cars/4_baru.jpg'), filename: '4_baru.jpg')
  photo_5 = Photo.create!(caption: 'how he do that', uploader_id: third_user.id)
  photo_5.photo.attach(io: URI.open('https://seer-seeds.s3.amazonaws.com/cars/5_levin.jpg'), filename: '5_levin.jpg')
  photo_6 = Photo.create!(caption: 'night run', uploader_id: third_user.id)
  photo_6.photo.attach(io: URI.open('https://seer-seeds.s3.amazonaws.com/cars/6_r32.jpg'), filename: '6_r32.jpg')
  photo_7 = Photo.create!(caption: 'classssss', uploader_id: fourth_user.id)
  photo_7.photo.attach(io: URI.open('https://seer-seeds.s3.amazonaws.com/cars/7_sedan.jpg'), filename: '7_sedan.jpg')
  photo_8 = Photo.create!(caption: 'dream', uploader_id: fourth_user.id)
  photo_8.photo.attach(io: URI.open('https://seer-seeds.s3.amazonaws.com/cars/8_dream.jpg'), filename: '8_dream.jpg')
  photo_9 = Photo.create!(caption: 'should I get it?', uploader_id: fifth_user.id)
  photo_9.photo.attach(io: URI.open('https://seer-seeds.s3.amazonaws.com/cars/9_FC.jpg'), filename: '9_FC.jpg')
  photo_10 = Photo.create!(caption: 'almost done', uploader_id: fifth_user.id)
  photo_10.photo.attach(io: URI.open('https://seer-seeds.s3.amazonaws.com/cars/10_SR20.jpg'), filename: '10_SR20.jpg')




  puts "Created example photos!"