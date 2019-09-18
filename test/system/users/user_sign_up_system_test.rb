require "application_system_test_case"

class UserSignUpSystemTest < ApplicationSystemTestCase

  test 'main page sign up button' do
    visit root_path
    within('.btn-sign-up') do
      click_on 'Sign Up!'
    end
    assert_text 'Sign up'
    assert_text 'Email'
    assert_text 'Password'
  end

  test 'user signup redirects to profile page' do
    visit new_user_registration_path
    fill_in 'Email', with: 'user@systemtest.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'

    click_on 'Sign up'
    assert_equal '/profile', current_path
  end
end
