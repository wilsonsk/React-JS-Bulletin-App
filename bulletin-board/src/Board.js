import React from 'react'
import './App.css'
import Note from './Note'

//Creating a board component -- will display a certain number of saved notes -- we will get the values of those notes from properties
            //Need to make the Board the parent of the Note component
var Board = React.createClass({
                //ERROR CHECKING: 
                //issue: if we supply a string, or Bool, or a function, we're not going to get the notes rendered correctly 
                //proptypes: optional built-in utility feature -- documentation for how we expect our components to work and what values you expect for them, but it also provides some nice functionality
                //proptypes: is going to be set equal to an object, and then you just define your properties inside of the object as different keys
                //this is going to be set equal to a function that will take in props and prop name 
                //then we're going to say if type of props prop name is not equal to number, so in other words, if the value for count is supplied as any other type besides a number, we want to throw an error
                
                propTypes:{
                    count: function(props, propName){
                        if(typeof props[propName] !== "number"){
                            return new Error("the count must be a number")
                        }
                        if(props[propName] > 100){
                            return new Error('creating ' + props[propName] + ' notes is ridiculous')
                        }
                    }
                },
                getInitialState(){
                    return{
                        //{/* change the notes array items to objects with key, id and key, note*/}
                        notes: []
                    }  
                },
                
                //So we have used the fetch api and we have used all these .then() to do the things we want to do after this data loads
                componentWillMount(){
                    if(this.props.count){
                        var url = `http://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`
                        fetch(url)
                            .then(results => results.json())
                            .then(array => array[0])
                            .then(text => text.split('. '))
                            .then(array => array.forEach(sentence => this.add(sentence)))
                            .catch(function(err){
                                console.log("Didn't connect to API")
                            })
                    }      
                },
                
                nextId(){
                    //handles incrementing our IDs and we can attach this to our ID here using this.nextIs and then calling that function 
                    this.uniqueId = this.uniqueId || 0
                    return this.uniqueId++
                },
                add(text){
                    //spread operator is going to take whatever is in the state of notes, where that's one note or a hundred notes, and it's going to make those the first items in the array
                    //then we are going to add on this new item in the array, an object with an ID and note
                    var notes = [
                        ...this.state.notes, 
                        {
                            id: this.nextId(),
                            note: text
                        }
                    ]
                    this.setState({notes})
                },
                //create an update() that is going to handle the editing of notes -- has 2 parameters
                //this will set our notes in state and then map over those and depending on whether or not this note should be updated we're going to use this little callback function here
                //using an ES6 arrow function, takes notes arg and it's going to check to see if the id of the note being edited is the note, if not, we're going to return the note
                //otherwise we're going to return a new object -- and the new object is going to push whatever keys are in the note already into that note using the spread operator -- ie., keep id as is but push new text into the key's value (note)
                //The spread syntax allows an expression to be expanded in places where multiple arguments (for function calls) 
                //or multiple elements (for array literals) or multiple variables  (for destructuring assignment) are expected.
                update(newText, id){
                    var notes = this.state.notes.map(note => (note.id !== id) ? note : {...note, note: newText})
                    //{/* setState() pushes all of our new notes into that */}
                    this.setState({notes})
                },
                //array.filter(): is a method that's just part of regular JS -- it's going to make a copy of the notes array and it will only return the items when the logical test is passed 
                //we will use a callback function here -- it takes in note and then we're going to check to see that the note id is not equal to the id
                remove(id){
                    var notes = this.state.notes.filter(note => note.id !== id)
                    this.setState({notes})
                },
                eachNote(note){
                    return (<Note key={note.id} id={note.id} onChange={this.update} onRemove={this.remove}>{note.note}</Note>)
                },
                render(){
                    return(
                        <div className="board">
                        {/* instead of using this.props.count, we are going to use a simple map function that's going to map over the notes array, and it's going to display
                            a note for each item in the array
                            {this.props.count}
                            this.state.notes.map is going to map over that array, so we are going to use a simple arrow function
                            this ES6 arror function is going to take arguments (note and i, which represents the array items) into this first set parentheses, and then it's going to return whatever follows the arrow
                            
                            ***** i.e., the map function calls the function for each element in the array (note = array, i = element 
                            
                        */}
                        
                            {this.state.notes.map(this.eachNote)}
                            <button onClick={() => this.add()}>+ NEW NOTE</button>
                        </div>
                    )
                }
            })

export default Board
