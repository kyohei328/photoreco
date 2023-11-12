namespace :pickup_today_photos do
  desc 'photos_pickup'
  task execute: :environment do
    photos = Photo.random_three
    TodayPhoto.delete_all
    photos.each do |photo|
      TodayPhoto.create(photo: photo)
    end
  end
end
