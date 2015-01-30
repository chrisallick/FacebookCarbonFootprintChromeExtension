require 'sinatra'
require 'sinatra/partial'
require 'sinatra/reloader' if development?

configure do
    redisUri = ENV["REDISTOGO_URL"] || 'redis://localhost:6379'
    uri = URI.parse(redisUri) 
    $redis = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
end

get '/' do
    content_type :json

    { :result => "success", :msg => "hello" }.to_json
end

not_found do
    { :result => "error", :msg => "url not found" }.to_json
end