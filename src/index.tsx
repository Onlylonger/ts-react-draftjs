import React from 'react'
import {
  Editor,
  EditorState,
  KeyBindingUtil,
  getDefaultKeyBinding,
  RichUtils,
  Modifier,
  DefaultDraftBlockRenderMap,
  convertToRaw,
  convertFromHTML,
  ContentState,
  DraftHandleValue,
  SelectionState,
  DraftDragType,
  DraftEditorCommand
} from 'draft-js'
import Immutable from 'immutable'
// import 'draft-js/dist/Draft.css'
import SectionBlock from './Block/SectionBlock'

const sampleMarkup =
  '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
  '<a href="http://www.facebook.com">Example link</a> <br />' +
  '<section>nihaoo,heheda,woshishenn</section>'

const blocksFromHTML = convertFromHTML(sampleMarkup)
const state = ContentState.createFromBlockArray(
  blocksFromHTML.contentBlocks,
  blocksFromHTML.entityMap
)

const { hasCommandModifier } = KeyBindingUtil

const blockRenderMap = Immutable.Map({
  section: {
    element: 'section',
    wrapper: SectionBlock
  }
})

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap)

interface IProp {
  placeholder: string
}

export default class GoodEditor extends React.Component<IProp> {
  state = {
    editorState: EditorState.createWithContent(state)
    // editorState: EditorState.createEmpty()
  }
  draftjsDom: Editor = null as any

  onChange = (editorState: EditorState) => {
    this.setState({
      editorState
    })
  }

  // Handle intended text insertion before the insertion occurs. This may be
  // useful in cases where the user has entered characters that you would like
  // to trigger some special behavior. E.g. immediately converting `:)` to an
  // emoji Unicode character, or replacing ASCII quote characters with smart
  // quotes.
  handleBeforeInput = (chars: string, editorState: EditorState): DraftHandleValue => {
    console.log('handleBeforeInput: ', chars, editorState)
    return 'not-handled'
  }

  // Handle other drops to prevent default text movement/insertion behaviour
  handleDrop = (
    selection: SelectionState,
    dataTransfer: Object,
    isInternal: DraftDragType
  ): DraftHandleValue => {
    console.log('handleDrop: ', selection, dataTransfer, isInternal)
    return 'not-handled'
  }

  // Handle dropped files
  handleDroppedFiles = (selection: SelectionState, files: Array<Blob>): DraftHandleValue => {
    console.log('handleDroppedFiles: ', selection, files)
    return 'not-handled'
  }

  // Map a key command string provided by your key binding function to a
  // specified behavior.
  handleKeyCommand = (command: DraftEditorCommand | string, editorState: EditorState) => {
    console.log('handleKeyCommand: ', command, editorState)
    if (command === 'editor-save') {
      console.log('dealing....')
      return 'handled'
    }
    return 'not-handled'
  }

  keyBindingFn = (e: React.KeyboardEvent<{}>) => {
    console.log('keyBindingFn: ', e.keyCode)
    if (e.keyCode === 83 && hasCommandModifier(e)) {
      return 'editor-save'
    }
    return getDefaultKeyBinding(e)
  }

  handlePastedFiles = (files: Array<Blob>): DraftHandleValue => {
    console.log('handlePastedFiles: ', files)
    return 'not-handled'
  }

  handlePastedText = (
    text: string,
    html: string | undefined,
    editorState: EditorState
  ): DraftHandleValue => {
    console.log('handlePastedText: ', text, html, editorState)
    return 'not-handled'
  }

  // Useful for managing special behavior for pressing the `Return` key. E.g.
  // removing the style from an empty list item.
  handleReturn = (e: React.KeyboardEvent<{}>, editorState: EditorState): DraftHandleValue => {
    console.log('handleReturn: ', e, editorState)
    return 'not-handled'
  }

  handleBold = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    console.log(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  handleAddEntity = () => {
    const selectionState = this.state.editorState.getSelection()
    const contentState = this.state.editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
      url: 'http://www.zombo.com'
    })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    // const contentStateWithLink = Modifier.applyEntity(
    //   contentStateWithEntity,
    //   selectionState,
    //   entityKey
    // )
    const newEditorState = EditorState.set(this.state.editorState, {
      currentContent: contentStateWithEntity
    })
    this.setState({
      editorState: RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey)
    })
    // this.onChange(contentStateWithEntity)
  }

  componentDidMount() {
    this.draftjsDom.focus()
  }

  render() {
    const { editorState } = this.state
    const { placeholder } = this.props
    return (
      <div className="good-editor" onClick={() => this.draftjsDom.focus()}>
        <button onClick={this.handleBold}>Bold</button>
        <button onClick={this.handleAddEntity}>Add entity</button>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          handleBeforeInput={this.handleBeforeInput}
          handleDrop={this.handleDrop}
          handleDroppedFiles={this.handleDroppedFiles}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={this.keyBindingFn}
          handlePastedFiles={this.handlePastedFiles}
          handlePastedText={this.handlePastedText}
          handleReturn={this.handleReturn}
          placeholder={placeholder}
          ref={(ref: Editor) => (this.draftjsDom = ref)}
          blockRenderMap={extendedBlockRenderMap}
          // textAlignment="center"
        />
      </div>
    )
  }
}
