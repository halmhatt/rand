class Rand

	# Function to use for random values
	random = Math.random

	BASE_64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

	#construct: ()->

	# This is seen as a random number dependent on the distribution
	@seed: (distribution = 'constant') ->

		switch(distribution)
			# Constant distribution (random) -> .:.:..:..:
			when 'constant', 'random'
				return random()

			# Stable distribution -> ..:|:..
			# Sharp edge in the middle
			when 'double-exponential', 'stable'
				return (random() - 0.5) * random() + 0.5

			# Like the stable distribution but 
			# only in one direction (outdying) -> |:....
			when 'exponential'
				return random() * random()

			# Linear curve decresing
			when 'linear-decrease'
				return 1 - Math.sqrt(random())

			# Linear curve incresing
			when 'linear-increase'
				return Math.sqrt(random())

			# Birnbaum-Saunders survival function ish
			when 'survival'
				r = random()
				return r*r

	# Check that value is between min and max
	@sanitize: (value, min = 0, max = 1) ->

		if value < min then return min

		if value > max then return max

		return value

	# Return a random value between min and max
	@random: (min = 0, max = 1, distribution = 'constant') ->
		random = Math.random
		interval = max - min

		# There are some different distributions
		seed = @seed(distribution)

		return @sanitize(min+seed * interval, min, max)

	# Return a boolean depending on the probability
	# returns false with probability
	@bool: (probability = 0.5) ->
		return random() >= probability

	# Return random int between min and max
	# Just an alias for parseInt(random())
	@int: (args...) ->

		return parseInt(@random.apply(@, args))

	# A hash string values 0-f
	@hash: (length = 40) ->
		str = '';

		while str.length < length
			str += @int(0, 16).toString(16)

		return str.substr(0, length)

	# Return a base36 string
	@base36: (length = 40) ->
		str = ''

		while str.length < length
			str += @int(0, 36*length).toString(36)

		return str.substr(0, length)

	# Return a base64 string
	@base64: (length = 40) ->
		str = ''
		b = BASE_64_CHARS

		while str.length < length
			str += b[@int(0, 64)]

		return str.substr(0, length)

	# Return random character
	@char: ->
		return @base36(1)

	# Return random hexadecimal color
	@color: ->
		return '#'+@hash(6)

	# Return random rgba color
	@rgba: ->
		return 'rgba('+ @int(0, 255)+','+@int(0, 255)+','+@int(0, 255)+ ','+(@int(0, 100)/100) + ')'

	# Return random date between min and max (1 year)
	@date: (min = new Date(), max)->

		# Check if min is object or not
		if typeof min is 'number'
			min = new Date(min)

		if not max
			# One year
			max = new Date()
			max.setFullYear(min.getFullYear() + 1)

		return new Date(@int(min.getTime(), max.getTime()))