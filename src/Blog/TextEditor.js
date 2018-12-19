import React from 'react'
import { Editor } from 'slate-react'
import BoldMark from './BoldMark'
import ItalicMark from './ItalicMark'
import UnderlineMark from './UnderlineMark'
import MarkHotKey from './Plugins/MarkHotKey'
import initialValue from '../utils/InitialValue'
// Define our app...

const boldPlugin = MarkHotKey({
  type: 'bold',
  key: 'b',
});
const italicPlugin = MarkHotKey({
  type: 'italic',
  key: 'i',
});
const underlinePlugin = MarkHotKey({
  type: 'underline',
  key: 'u',
});
const textSize1Plugin = MarkHotKey({
  type: 'textsize1',
  key: '1'
});
const textSize2Plugin = MarkHotKey({
  type: 'textsize2',
  key: '2'
});
const textSize3Plugin = MarkHotKey({
  type: 'textsize3',
  key: '3'
})
class TextEditor extends React.Component {
  // Set the initial value when the app is first constructed.
  state = {
    value: initialValue,
  }

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ value })
    const content = JSON.stringify(value.toJSON())
    localStorage.setItem('content', content)
  }

  onKeyDown=(event,editor,next)=>{
    if(!event.ctrlKey && !event.metaKey){
       return next();
     }

    switch(event.key){
      case 'b':{
        event.preventDefault()
        editor.toggleMark('bold')
        break;
      }
      case 'i':{
        event.preventDefault()
        editor.toggleMark('italic')
        break;
      }
      case 'u':{
        event.preventDefault()
        editor.toggleMark('underline')
        break;
      }
      case '1':{
        break;
      }
      default:{
        return next()
      }
    }
  }

  // Render the editor.
  render() {
    return(
      <Editor
        value={this.state.value}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        renderMark={this.renderMark}
      />
    )
  }

  renderMark(props,editor,next){
    switch(props.mark.type){
      case 'bold':{
        return <BoldMark {...props}/>
      }
      case 'italic':{
        return <ItalicMark {...props}/>
      }
      case 'underline':{
        return <UnderlineMark {...props}/>
      }
      default:{
        return next()
      }
    }
  }
}
export default TextEditor
