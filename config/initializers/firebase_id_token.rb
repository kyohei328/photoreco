FirebaseIdToken.configure do |config|
  config.redis = Redis.new
  config.project_ids = ['FIREBASE_PROJECT_ID']
end