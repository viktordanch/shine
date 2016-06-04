require 'rails_helper'

feature 'test angular' do
  let(:email) { 'bob@example.com' }
  let(:password) { '1111111111' }

  before do
    User.create!(
      email: email,
      password: password,
      password_confirmation: password,
    )
  end

  scenario 'Our test angilar app is working' do
    visit '/angular_test'

    # Login
    fill_in 'Email', with: email
    fill_in 'Password', with: password
    click_button 'Log in'

    # check page
    expect(page).to have_content('Name')

    # Test the page
    fill_in 'name', with: 'Bob'
    within 'header h1' do
      expect(page).to have_content('Hello, Bob')
    end
  end
end