#!/usr/bin/ruby

class Number < Struct.new(:value)
end

class Add < Struct.new(:left, :right)
end

class Multiply < Struct.new(:left, :right)
end

class Boolean < Struct.new(:value)
	def to_s
		value.to_s
	end
	
	def inspetc
		"<<#{self}>>"
	end
	
	def reducible?
		false
	end
end

class Number   
	def to_s
		value.to_s
	end
	
	def inspetc
		"《#{self}》"
	end	
	
	def reducible?
		false
	end				
end

class Add
	def to_s
		"#{left} + #{right}"
	end
	
	def inspetc
		"《#{self}》"
	end
	
	def reducible?
		true
	end		
	
	def reduce(environment)
		if left.reducible?
			Add.new(left.reduce(environment), right)
		elsif right.reducible?
			Add.new(left, right.reduce(environment))
		else
			Number.new(left.value + right.value)
		end			
	end 
end	

class Multiply
	def to_s
		"#{left} * #{right}"
	end
	
	def inspetc
		"《#{self}》"
	end
	
	def reducible?
		true
	end		
	
	def reduce(environment)
		if left.reducible?
			Multiply.new(left.reduce(environment), right)
		elsif right.reducible?
			Multiply.new(left, right.reduce(environment))
		else
			Number.new(left.value + right.value)
		end			
	end 
end	

class LessThan < Struct.new(:left, :right)
	def to_s
		"#{left} < #{right}"
	end
	
	def inspetc
		"<<#{self}>>"
	end
	
	def reducible?
		true
	end
	
	def reduce(environment)
		if left.reducible?
			LessThan.new(left.reduce(environment), right)
		elsif right.reducible?
			LessThan.new(left, right.reduce(environment))
		else
			Boolean.new(left.value < right.value)	
		end		
	end				
end

class Variable < Struct.new(:name)
	def to_s
		name.to_s
	end
	
	def inspetc
		"<<#{self}>>"
	end
	
	def reducible?
		true
	end
	
	def reduce(environment)
		environment[name]		
	end				
end		

#Object.send(:remove_const, :Machine)

class Machine < Struct.new(:expression, :environment)
	def step
		self.expression = expression.reduce(environment)
	end 
	
	def run
		while expression.reducible?
			puts expression
			step
		end 
		puts expression
	end
end

#puts Number.new(1).reducible?
		
#puts Add.new(Multiply.new(Number.new(1), Number.new(2)), Multiply.new(Number.new(1), Number.new(2))).inspetc

#Machine.new(Add.new(Multiply.new(Number.new(1), Number.new(2)), Multiply.new(Number.new(1), Number.new(3)))).run
#Machine.new(LessThan.new(Number.new(5), Add.new(Number.new(2), Number.new(2)))).run
Machine.new(Add.new(Variable.new(:x), Variable.new(:y)), { x: Number.new(3), y: Number.new(4) }).run

#puts expression = expression.reduce
#puts expression = expression.reduce
#puts expression = expression.reduce