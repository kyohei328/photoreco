class Api::V1::PhotosController < ApplicationController
  require 'mini_exiftool'
  require 'exifr/jpeg'

  skip_before_action :set_auth, only: %i [index]

  def index

  end

  def create
    photo = current_user.pohots.build(photo_params)
    add_Exif_to_photo(photo, params[:photo][:photo_img])

    if photo.save
      render json: photo
    else
      render json: { errors: photo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update

  end

  def desrtroy

  end

  def latest
    photo = Photo.last
    render json: photo
  end

  private

  def photo_params
    params.require(:photo).permit(:title, :description, :photo_img)
  end

  # リファクタリング必要
  def add_Exif_to_photo(photo, uploard_image)
    tempfile = Tempfile.new
    tempfile.binmode
    tempfile.write(uploaded_image.read)
    tempfile.rewind

    exif = MiniExiftool.new(tempfile)

    tempfile.rewind
    exir_data = EXIFR::JPEG.new(tempfile)

    tempfile.close
    tempfile.unlink

    if exif_data.gps.present?
      latitude = exif_data.gps.latitude
      longitude = exif_data.gps.longitude
    else
      latitude = nil
      longitude = nil
    end

    photo.assign_attributes(
      gps_latitude: latitude,
      gps_longitude: longitude,
      camera: exif.Model,
      lens: exif.Lens,
      ISO_sensitivity: exif.ISO,
      shutter_speed: exif.ExposureTime,
      exposure_compensation: exif.ExposureCompensation,
      aperture: exif.FNumber,
      focal_length: exif.FocalLength,
      white_balance: exif.WhiteBalance,
      shooting_mode: exif.ExposureMode,
      image_size_width: exif.ImageWidth,
      image_size_height: exif.ImageHeight
    )
  end
end
