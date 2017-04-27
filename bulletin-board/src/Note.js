import React from 'react'
import './App.css'
import Draggable from 'react-draggable'

var Note = React.createClass({
                //in addition to our simple render method, we can create our own methods inside of our components
                //here we are going to create an edit function 
                
                getInitialState(){
                    return{editing: false}
                },
                
                //componentWillMount will execute right before the render
                //componentWillMount is going to set up a style on the new note using the randomBetween()
                //we've made use of the component will mount method to add this right before our DOM elements are rendered
                
                componentWillMount(){
                    this.style = {
                        right: this.randomBetween(0, window.innerWidth - 150, 'px'),
                        top: this.randomBetween(0, window.innerHeight - 150, 'px')
                    }
                },
                
                componentDidUpdate(){
                    if(this.state.editing){
                        this.refs.newText.focus()
                        this.refs.newText.select()
                    }
                },
                
                //shouldComponentUpdate(): invoked right before rendering and are often used for optimization -- only going to call these methods if something has changed 
                //don't want note to re-render if the text msg has not changed
                shouldComponentUpdate(nextProps, nextState){
                    return this.props.children !== nextProps.children || this.state !== nextState
                },
                
                //We are going to make special use of this key property by using a random function within our component. Random between is going to take in X, Y, and S. X is the X axis, Y is the Y, and S is the units. 
                //The random between method is going to be in charge of generating a random number between certain numbers. We're going to say X plus math dot ceil, and then inside of math dot ceil, we use math dot random.
                //Math dot random is going to generate a random number between zero and one. Then, we're going to subtract X from Y, making this a number somewhere there on our screen
                //Then, at the end here, we're going to add on S for our units.
                
                randomBetween(x, y, s){
                    return(x + Math.ceil(Math.random() * (y-x))) + s
                },
                edit(){
                      //alert("Editing Note")
                      this.setState({editing: true})
                },
                save(){
                    {/* in order to check a UI element's value: use references (in this example, in the var, val referenced in the textarea) */} 
                    this.props.onChange(this.refs.newText.value, this.props.id)
                    this.setState({editing: false})
                },
                remove(){
                    this.props.onRemove(this.props.id)
                },
                renderForm(){
                    {/* in order to check a UI element's value: use references (in this example, in the textarea) */} 
                    return(<div className="note" style={this.style}>
                        <textarea ref="newText" defaultValue={this.props.children}></textarea>
                        <button onClick={this.save}>SAVE</button>
                    </div>
                    )
                },
                renderDisplay(){
                    return (
                        <div className="note" style={this.style}>
                            <p>{this.props.children}</p>
                            <span>
                                {/* the onClick function values are within {} denoting JSX syntax */}
                                <button onClick={this.edit}>EDIT</button>
                                <button onClick={this.remove}>X</button>
                            </span>
                        </div>
                    )                    
                },
                render(){
                    {/*if(this.state.editing){
                        return this.renderForm()
                    }else{
                        return this.renderDisplay()
                    } below is an alternative simplified syntax making it more terse and concise -- an inline if-else statement
                    This is a pretty popular syntax that you'll see, especially in React documentation. A little bit easier to write, and definitely easier to read, so I just wanted to make a little enhancement there. 
                    */}
                    {/* 
                        wrap return statement in ReactDraggable -- first wrap statement in new set of ()
                    */}
                    return (<Draggable>
                        {(this.state.editing) ? this.renderForm(): this.renderDisplay()}
                        </Draggable>
                    )
                }
            })
            
export default Note