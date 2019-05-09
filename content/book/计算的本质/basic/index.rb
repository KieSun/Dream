#!/usr/bin/ruby

multiply = -> x, y { x * y }
puts multiply.call(6, 9)

def join_with_commas(*words) 
	words.join(', ')
end

puts join_with_commas('one', 'two', 'three')