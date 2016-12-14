class LinkedList
	attr_accessor :value, :next_node, :node
	def initialize(node)
		@head = node
		#this will not just add one node but it will add the one node and all nodes that the node points to
	end

	def append(node)#adds value to the end of the list
		self.tail.next_node = node
	end

	def preappend(node)#adds value to the begining of the list
		node.next_node = @head
		@head = node
	end

	def size#returns the size of the list
		count = 1 
		size = @head
		while size.next_node != nil
			size = size.next_node
			count += 1
		end
		count
	end

	def head#returns the first value of the list
		@head
	end

	def tail#returns the last value of the list
		tail = @head
		while tail.next_node != nil
			tail = tail.next_node
		end
		tail
	end

	def at(index)#returns the value at the given index
		return self.head if index == 0
		return "INDEX VALUE OUT OF SIZE" if index > self.size
		return "Sorry -1 array type indexing isnt working yet" if index < 0
		index_val = self.head
		index.times do 
			index_val = index_val.next_node
		end
		index_val
	end

	def pop #removes the last element
		new_last = self.size - 2
		self.at(new_last).next_node = nil
	end

	def contains?(value_c) #returns true if the passed value is in the list otherwise returns false
		count = 0
		node_contain = self.head
		return true if node_contain.value == value_c
		while count < self.size do
			if node_contain.value == value_c
				return true
				break
			else
				node_contain = node_contain.next_node
			end
			count += 1		
		end
		false
	end

	def find(value_c)#returns the index value for the passed value or nil if not found
		count = 0
		node_contain = self.head
		return 0 if node_contain.value == value_c
		while count < self.size do
			if node_contain.value == value_c
				return count
				break
			else
				node_contain = node_contain.next_node
			end
			count += 1		
		end
		nil
	end

	def to_s#represents your linked list objects as strings so that you can preview them in the console
		msg = ""
		start = self.head
		return "#{self.head.value} -> nil" if self.head.next_node == nil
		while start.next_node != nil
			msg << "#{start.value} ->"
			start = start.next_node
		end
		msg << " nil"
	end
end

class Node
	attr_accessor :value, :next_node

	def initialize(value = nil, next_node = nil)
		@value = value
		@next_node = next_node
	end
end
node_app = Node.new("Appended")

node_5 = Node.new("5")
node_4 = Node.new("4")
node_3 = Node.new("3")
node_2 = Node.new("2")
node_1 = Node.new("1")

list_1 = LinkedList.new(node_1)

list_1.preappend(node_2)
list_1.preappend(node_3)
list_1.preappend(node_4)
list_1.preappend(node_5)

list_1.append(node_app)
puts list_1.inspect
puts list_1.size
puts list_1.at(0).value
puts list_1.at(1).value
puts list_1.at(5).value
list_1.pop
list_1.inspect
#list_1.contains?("3")
puts list_1.size
#puts list_1.contains?("apple")
puts list_1.find("3")
puts list_1.to_s
list2 = LinkedList.new(node_app)
puts list2.to_s