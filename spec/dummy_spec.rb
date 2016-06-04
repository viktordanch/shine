require 'rails_helper.rb'

describe 'testing that rspec is configured' do
  it 'should be true' do
    expect(true).to eq(true)
  end

  it 'should be fail' do
    expect(false).to eq(false)
  end
end