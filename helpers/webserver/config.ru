#\ -p 9296

require 'rubygems'
require 'bundler'

Bundler.require

require './app.rb'

run Sinatra::Application