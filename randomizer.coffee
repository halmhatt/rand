class Randomizer
	construct: ()->

	# This is seen as a random number dependent on the distribution
	@seed: (distribution = 'constant') ->
		random = Math.random

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

		return @sanitize(seed * interval, min, max)