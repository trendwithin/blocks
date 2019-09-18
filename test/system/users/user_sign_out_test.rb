require "application_system_test_case"

class UserSignOutTest < ApplicationSystemTestCase

  setup do
    @user = users(:user_vic)
  end

  test 'user sign out cycle' do
    visit user_session_path
    fill_in 'user[email]', with: @user.email
    fill_in 'user[password]', with: 'password'
    find('input[name="commit"]').click
    assert_selector 'h1', text: 'This is the Main Page'
    token = page.find('div[data]')['data']
    click_link 'Logout'
  end
end
