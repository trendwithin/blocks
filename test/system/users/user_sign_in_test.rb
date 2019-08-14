require "application_system_test_case"

class UserSignInTest < ApplicationSystemTestCase

  setup do
    @user = User.create(email: 'signin@test.com', password: 'password')
  end

  test 'valid token credential when user logs in' do
    visit user_session_path
    fill_in 'user[email]', with: @user.email
    fill_in 'user[password]', with: 'password'
    find('input[name="commit"]').click
    assert_selector 'h1', text: 'This is the Main Page'
    token = page.find('div[data]')['data']
    decoded = JwtService.decode(token)
    user_id = decoded['user_id']
    assert_equal @user.id, user_id
  end

  test 'logins initialize new token due to expiration' do
    visit user_session_path
    fill_in 'user[email]', with: @user.email
    fill_in 'user[password]', with: 'password'
    find('input[name="commit"]').click
    assert_selector 'h1', text: 'This is the Main Page'
    token = page.find('div[data]')['data']
    click_link 'Logout'
    assert_selector 'h2', text: 'Log in'
    travel 2.days
    visit user_session_path
    fill_in 'user[email]', with: @user.email
    fill_in 'user[password]', with: 'password'
    find('input[name="commit"]').click
    new_token = page.find('div[data]')['data']
    refute_equal token, new_token
  end
end
