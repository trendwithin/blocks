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
end
