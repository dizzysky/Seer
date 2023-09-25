# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

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


    puts "Creating example photos..." 

    first_user = User.first


    Photo.create([
      {
        caption: 'First example photo', 
        uploader_id: first_user.id, 
        album_id: nil, 
        created_at: Time.now, 
        updated_at: Time.now
      },
      {
        caption: 'Second example photo', 
        uploader_id: first_user.id, 
        album_id: nil, 
        created_at: Time.now, 
        updated_at: Time.now
      },
      {caption: 'saw this yesterday',
        uploader_id: 2,
        album_id: nil,
        created_at: Time.now,
        updated_at: Time.now
      },
      {caption: 'very sleepy',
        uploader_id: 2, 
        album_id: nil, 
        created_at: Time.now,
        updated_at: Time.now
      },
      {caption: 'view from hell',
        uploader_id: 3,
        album_id: nil, 
        created_at: Time.now,
        updated_at: Time.now
      }
    ])

    puts "Created example photos!"
  end



  # Bench.first(3).each_with_index do |bench, index|
  #   bench.photo.attach(
  #     # The string passed to URI.open should be the URL of the image in its bucket.
  #     # This sample assumes the bucket name is `benchbnb-seeds`.
  #     io: URI.open("https://benchbnb-seeds.s3.amazonaws.com/bench_#{index + 1}.jpg"), 
  #     filename: "bench_#{index + 1}.jpg"
  #   )
  # end