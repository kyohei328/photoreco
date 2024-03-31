source 'https://rubygems.org'
gem 'rails', '7.0.8'
# ap server

gem 'bootsnap', '1.16.0'
gem 'msgpack', '1.7.2'
gem 'webrick', '~> 1.7'

# db
# gem 'pg'

gem 'unicorn'

# Token検証
gem 'jwt'
gem 'dotenv-rails'

# json
gem 'fast_jsonapi'

# 通信設定
gem 'rack-cors'

# debug
gem 'pry-byebug'
gem 'pry-rails'

# 画像情報 取得
gem 'mini_exiftool'
gem 'exifr'

# 画像アップロード
gem 'aws-sdk-s3'

# タスク
gem 'whenever'

# 検索
gem 'ransack'

gem 'kaminari'

group :development, :test do
  gem 'pg'
  gem "rspec-rails"
  gem 'rubocop', require: false
  gem 'rubocop-performance', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec', require: false
end

group :production do
  gem 'pg'
end