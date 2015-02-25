class WelcomeController < ApplicationController

	def index
		# uri = URI( "http://localhost" )
		# uri = URI( "http://baidu.com" )
		# result = Net::HTTP.get_response( uri )
		# something wrong
		# render json: { uri: uri }, layout: false
		# render json: { result: Net::HTTP.get( uri ) }
		# render Net::HTTP.get( uri )
		# render Net::HTTP.get( uri ), layout: false
		# render plain: uri.scheme,
		# render plain: uri.host

		# uri = URI( "http://cn.bing.com/search?q=ruby+api&qs=n&form=QBRE&pq=ruby+api&sc=8-8&sp=-1&sk=&cvid=d608d37de5a746f98061e04c760461a0" )
		# render json: URI.decode_www_form_component( uri.to_s, Encoding::UTF_8 )
		# render json: uri.query

		# TODO: url_params
		# TODO: header
		# TODO: form_data
		# TODO: x-www-form-urlencoded
		# TODO: RAW
		# TODO: binary
		# TODO: preview header
		# TODO: ruby on rails
	end

	# TODO: preview
	def preview
		render plain: @request.header unless @request != nil && @request.header != nil
	end

	# TODO: build
	# TODO: check error, exception

	# @params { url: string, headers:{}, url_params:{}, form_data: {}, x_www_form_urlencoded: {} }
	def build
		params[:url] = "http://localhost:3000"
		params[:url_params] = { name: 'zhenjun', env: 'test' }

		# url
		@request = URI( params[:url] )

		# url_params
		# TODO: query error
		# params[:url_params].each do |key, value|
		# 	query += "#{key}=#{value}"
		# end
		@request.query = params[:url_params]

		# headers
		# TODO: check errors, exception
		if params[:headers] != nil
			params[:headers].each { |field, value| @request.add_field(field, value) }
		end

		# form_data
		@request.set_form_data( params[:form_data] ) unless params[:form_data] == nil

		# x-www-formm-urlencoded
		@request.set_form( params[:x_www_form_urlencoded] ) unless params[:x_www_form_urlencoded] == nil
	end

	# TODO: send
	# TODO: check errors, exception
	def connect
		@response = Net::HTTP.get_response( @request ) unless @request != nil
	end


	def basicAuth
		
	end

	def digestAuth
	end

	def oauth1
	end

	def oauth2
	end

	def history
	end

	def collection
	end
end
