class Ops

  def self.aptInt?(x)
    !(x.nil?) && (x.is_a? Integer)
  end

  def self.aptNumeric?(x)
    !(x.nil?) && (x.is_a? Numeric)
  end

  def self.aptString?(x)
    !(x.nil?) && (x.is_a? String) && !(x.empty?)
  end

  def self.aptArray?(x)
    !(x.nil?) && (x.is_a? Array) && !(x.empty?)
  end

  def self.aptObject?(x)
    !(x.nil?) && (x.is_a? Object) && !(x.empty?)
  end

  def self.aptBoolean?(x)
    x == true or x == false
  end

  #-------------------------------------------------------------------------------------------

  def self.drill(o, chain) 
    if(o.nil? || chain.length == 0)
      return o
    end
    field = chain.delete_at(0)
    return drill(o[field], chain)
  end

  #-------------------------------------------------------------------------------------------

  def self.nowLocal()
    return Time.now.getlocal
  end

  def self.nowUtc()
    return Time.now.utc
  end

  def self.nowMillis()
    return (Time.now.to_f * 1000.0).to_i
  end

  def self.nowTimestampLocal()
    return Time.now.getlocal.round(10).iso8601(3)
  end

  def self.nowTimestampUtc()
    return Time.now.utc.round(10).iso8601(3)
  end

  #------

  def self.timestampToMillis(ts)
    return (Time.parse(ts).to_f * 1000.0).to_i
  end

  #------

  def self.millisToLocalTimestamp(millis)
    seconds = (millis.to_f / 1000.0).to_i
    return Time.at(seconds).getlocal.round(10).iso8601(3)
  end

  def self.millisToUtcTimestamp(millis)
    seconds = (millis.to_f / 1000.0).to_i
    return Time.at(seconds).utc.round(10).iso8601(3)
  end

  def self.timestampToLocalTimestamp(ts)
    return Time.parse(ts).getlocal.round(10).iso8601(3)
  end

  def self.timestampToUtcTimestamp(ts)
    return Time.parse(ts).utc.round(10).iso8601(3)
  end

  #keep same timezone as input timestamp
  def self.timestampToTimestamp(ts)
    return Time.parse(ts).round(10).iso8601(3)
  end

  #returns offset in milliseconds
  #ex. 18000000 for +0500
  def self.getTimestampOffset(ts)
    return Time.parse(ts).utc_offset * 1000
  end

  #------

  def self.compareNewness(stampA, stampB)
    aInst = stampA ? Ops.timestampToMillis(stampA) : 0
    bInst = stampB ? Ops.timestampToMillis(stampB) : 0

    #a newer => -ve
    #equal => 0
    #b newer => +ve
    return bInst - aInst
  end

  #-------------------------------------------------------------------------------------------

  def self.compareVersions(a, b)
    a = a.split('.').map { |p| p.to_i }
    b = b.split('.').map { |p| p.to_i }
    len = [a.size, b.size].max
    
    result = 0
    for i in 0..len-1
      if(a[i] != b[i])
        result = a[i] < b[i] ? -1 : 1
        break
      end
    end
    return result
  end

end