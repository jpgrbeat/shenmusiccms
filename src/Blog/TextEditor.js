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

const plugins = [boldPlugin,italicPlugin,underlinePlugin,textSize1Plugin,textSize2Plugin,textSize3Plugin]
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


  // Render the editor.
  render() {
    return(
      <Editor
        plugins={plugins}
        value={this.state.value}
        onChange={this.onChange}
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
      case 'textsize1':{
        return <h1>{props.children}</h1>
      }
      case 'textsize2':{
        return <h2>{props.children}</h2>
      }
      case 'textsize3':{
        return <h3>{props.children}</h3>
      }
      default:{
        return next()
      }
    }
  }
}
export default TextEditor
