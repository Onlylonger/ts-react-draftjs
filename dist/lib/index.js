"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var draft_js_1 = require("draft-js");
var immutable_1 = require("immutable");
// import 'draft-js/dist/Draft.css'
var SectionBlock_1 = require("./Block/SectionBlock");
var sampleMarkup = '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
    '<a href="http://www.facebook.com">Example link</a> <br />' +
    '<section>nihaoo,heheda,woshishenn</section>';
var blocksFromHTML = draft_js_1.convertFromHTML(sampleMarkup);
var state = draft_js_1.ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
var hasCommandModifier = draft_js_1.KeyBindingUtil.hasCommandModifier;
var blockRenderMap = immutable_1.default.Map({
    section: {
        element: 'section',
        wrapper: SectionBlock_1.default
    }
});
var extendedBlockRenderMap = draft_js_1.DefaultDraftBlockRenderMap.merge(blockRenderMap);
var GoodEditor = /** @class */ (function (_super) {
    __extends(GoodEditor, _super);
    function GoodEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            editorState: draft_js_1.EditorState.createWithContent(state)
            // editorState: EditorState.createEmpty()
        };
        _this.draftjsDom = null;
        _this.onChange = function (editorState) {
            _this.setState({
                editorState: editorState
            });
        };
        // Handle intended text insertion before the insertion occurs. This may be
        // useful in cases where the user has entered characters that you would like
        // to trigger some special behavior. E.g. immediately converting `:)` to an
        // emoji Unicode character, or replacing ASCII quote characters with smart
        // quotes.
        _this.handleBeforeInput = function (chars, editorState) {
            console.log('handleBeforeInput: ', chars, editorState);
            return 'not-handled';
        };
        // Handle other drops to prevent default text movement/insertion behaviour
        _this.handleDrop = function (selection, dataTransfer, isInternal) {
            console.log('handleDrop: ', selection, dataTransfer, isInternal);
            return 'not-handled';
        };
        // Handle dropped files
        _this.handleDroppedFiles = function (selection, files) {
            console.log('handleDroppedFiles: ', selection, files);
            return 'not-handled';
        };
        // Map a key command string provided by your key binding function to a
        // specified behavior.
        _this.handleKeyCommand = function (command, editorState) {
            console.log('handleKeyCommand: ', command, editorState);
            if (command === 'editor-save') {
                console.log('dealing....');
                return 'handled';
            }
            return 'not-handled';
        };
        _this.keyBindingFn = function (e) {
            console.log('keyBindingFn: ', e.keyCode);
            if (e.keyCode === 83 && hasCommandModifier(e)) {
                return 'editor-save';
            }
            return draft_js_1.getDefaultKeyBinding(e);
        };
        _this.handlePastedFiles = function (files) {
            console.log('handlePastedFiles: ', files);
            return 'not-handled';
        };
        _this.handlePastedText = function (text, html, editorState) {
            console.log('handlePastedText: ', text, html, editorState);
            return 'not-handled';
        };
        // Useful for managing special behavior for pressing the `Return` key. E.g.
        // removing the style from an empty list item.
        _this.handleReturn = function (e, editorState) {
            console.log('handleReturn: ', e, editorState);
            return 'not-handled';
        };
        _this.handleBold = function () {
            _this.onChange(draft_js_1.RichUtils.toggleInlineStyle(_this.state.editorState, 'BOLD'));
            console.log(draft_js_1.convertToRaw(_this.state.editorState.getCurrentContent()));
        };
        _this.handleAddEntity = function () {
            var selectionState = _this.state.editorState.getSelection();
            var contentState = _this.state.editorState.getCurrentContent();
            var contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
                url: 'http://www.zombo.com'
            });
            var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            // const contentStateWithLink = Modifier.applyEntity(
            //   contentStateWithEntity,
            //   selectionState,
            //   entityKey
            // )
            var newEditorState = draft_js_1.EditorState.set(_this.state.editorState, {
                currentContent: contentStateWithEntity
            });
            _this.setState({
                editorState: draft_js_1.RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey)
            });
            // this.onChange(contentStateWithEntity)
        };
        return _this;
    }
    GoodEditor.prototype.componentDidMount = function () {
        this.draftjsDom.focus();
    };
    GoodEditor.prototype.render = function () {
        var _this = this;
        var editorState = this.state.editorState;
        var placeholder = this.props.placeholder;
        return (react_1.default.createElement("div", { className: "good-editor", onClick: function () { return _this.draftjsDom.focus(); } },
            react_1.default.createElement("button", { onClick: this.handleBold }, "Bold"),
            react_1.default.createElement("button", { onClick: this.handleAddEntity }, "Add entity"),
            react_1.default.createElement(draft_js_1.Editor, { editorState: editorState, onChange: this.onChange, handleBeforeInput: this.handleBeforeInput, handleDrop: this.handleDrop, handleDroppedFiles: this.handleDroppedFiles, handleKeyCommand: this.handleKeyCommand, keyBindingFn: this.keyBindingFn, handlePastedFiles: this.handlePastedFiles, handlePastedText: this.handlePastedText, handleReturn: this.handleReturn, placeholder: placeholder, ref: function (ref) { return (_this.draftjsDom = ref); }, blockRenderMap: extendedBlockRenderMap })));
    };
    return GoodEditor;
}(react_1.default.Component));
exports.default = GoodEditor;
//# sourceMappingURL=index.js.map