require 'net/http'

class Tracer
    VTRACER_POST_URL ||= ENV.fetch('VTRACER_POST_URL')

    def self.vtrace(level, *messages)
        if(!Ops.aptString?(VTRACER_POST_URL))
            Tracer.cputs(messages.join(', '), 35)
            return
        end

        begin
            uri = URI(VTRACER_POST_URL)
            _http = Net::HTTP.new(uri.host, uri.port)
            _http.use_ssl = false

            req = Net::HTTP::Post.new(uri.path, {'Content-Type' => 'application/json'})
            req.body = {
                bundle: 'RAILS',
                instant: (Time.now.to_f * 1000.0).to_i,
                level: level,
                text: messages.join(', '),
            }.to_json

            res = _http.request(req)
            #puts response.body
        rescue Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError, Errno::ECONNREFUSED,
                Net::HTTPBadResponse, Net::HTTPHeaderSyntaxError, Net::ProtocolError => e
            Tracer.cputs('-------------', 31)
            Tracer.cputs('Problem talking to VTracer: ' + e.message, 31) #print to normal output if vtracer is unavailable
            Tracer.cputs('Original Message: ' + messages.join(', '), 31)
            Tracer.cputs('-------------', 31)
        end
    end

    def self.v(*messages)
        # begin
            # @my_log ||= Logger.new("#{Rails.root}/log/tracer.log")
            # @my_log.debug(messages.join(', '))
            self.vtrace('v', *messages)
        # rescue
        #     puts messages.join(', ')
        # end
    end

    def self.d(*messages)
        # begin
            # @my_log ||= Logger.new("#{Rails.root}/log/tracer.log")
            # @my_log.debug(messages.join(', '))
            self.vtrace('d', *messages)
        # rescue
        #     puts messages.join(', ')
        # end
    end

    def self.i(*messages)
        # begin
            # @my_log ||= Logger.new("#{Rails.root}/log/tracer.log")
            # @my_log.info(messages.join(', '))
            self.vtrace('i', *messages)
        # rescue
        #     puts messages.join(', ')
        # end
    end

    def self.w(*messages)
        # begin
            # @my_log ||= Logger.new("#{Rails.root}/log/tracer.log")
            # @my_log.warn(messages.join(', '))
            self.vtrace('w', *messages)
        # rescue
        #     puts messages.join(', ')
        # end
    end

    def self.e(*messages)
        # begin
            # @my_log ||= Logger.new("#{Rails.root}/log/tracer.log")
            # @my_log.error(messages.join(', '))
            self.vtrace('e', *messages)
        # rescue
        #     puts messages.join(', ')
        # end
    end

    def self.f(*messages)
        # begin
            # @my_log ||= Logger.new("#{Rails.root}/log/tracer.log")
            # @my_log.fatal(messages.join(', '))
            self.vtrace('e', *messages)
        # rescue
        #     puts messages.join(', ')
        # end
    end

    #-----

    #red=31, green=32, yellow=33, blue=34, pink=35, lightBlue=36
    def self.cputs(message, colorCode)
        puts "\e[#{colorCode}m#{message}\e[0m"
    end
end