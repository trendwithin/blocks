# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Pin.delete_all
Topic.delete_all
Interest.delete_all
User.delete_all

user_one = User.create!(email: 'test@example.com', password: 'password')
user_two = User.create!(email: 'seed@example.com', password: 'password')
interest = Interest.create!(curiosity: 'Language')
topic = Topic.create!(subject: 'Italian', interest_id: interest.id)
pin = Pin.create(user_id: user_one.id, latitude: 47.599696, longitude: -122.332720, topic_id: topic.id)

webdev = Interest.create!(curiosity: 'Web Development')
Topic.create!(subject: 'Rails', interest_id: webdev.id )
Topic.create!(subject: 'React', interest_id: webdev.id )

pin_message_one = PinMessage.new(user_id: user_one.id, pin_id: pin.id, message: 'At a Local Cafe')
pin_message_one.save
pin_message_two = PinMessage.new(user_id: user_two.id, pin_id: pin.id, message: 'I am near by')
pin_message_two.save
