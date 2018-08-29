import React from 'react'

export default class SectionBlock extends React.Component {
  render() {
    return (
      <div className="MyCustomBlock">
        {/* here, this.props.children contains a <section> container, as that was the matching element */}
        {this.props.children}
      </div>
    )
  }
}
