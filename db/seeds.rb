# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(email: 'test@example.com', password: 'password')
user = User.create!(email: 'seed@example.com', password: 'password')
interest = Interest.create!(curiosity: 'Language')
topic = Topic.create!(subject: 'Italian', interest_id: interest.id)
pin = Pin.create(user_id: user.id, latitude: 47.599696, longitude: -122.332720, topic_id: topic.id)
