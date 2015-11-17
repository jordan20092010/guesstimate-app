import React, {Component, PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import GuesstimateForm from './guesstimate_form';
import './style.css'
import DistributionModal from 'gComponents/distributions/editor/modal'

export default class MetricEditingPane extends Component {
  static propTypes = {
    guesstimate: PropTypes.object.isRequired,
    guesstimateForm: PropTypes.object.isRequired,
    metricId: PropTypes.string.isRequired,
    onChangeGuesstimate: PropTypes.func,
  }

  componentWillUnmount() {
    const changedInput = (this.props.guesstimateForm.input !== this.props.guesstimate.input)
    if (this.hasTextInput() && changedInput) {
      this.props.onChangeGuesstimate(this.props.guesstimateForm)
    }
  }

  state = {modalIsOpen: false};

  openModal() {
     this.setState({modalIsOpen: true});
  }

  closeModal() {
     this.setState({modalIsOpen: false});
  }

  submitModal(guesstimate) {
    this.props.onChangeGuesstimate(guesstimate)
    this.setState({modalIsOpen: false});
  }

  resetGuesstimate() {
    this.props.onChangeGuesstimate({})
  }

  hasTextInput() {
    const input = this.props.guesstimateForm.input
    return (_.isString(input) && input.length)
  }

  hasGraphicalInput() {
    return !!this.props.guesstimate.guesstimateType
  }

  render() {
    const hasGraphicalInput = this.hasGraphicalInput()
    return (
      <div className='metric-container editing-section' key={this.props.metricId}>

        <GuesstimateForm
            guesstimate={this.props.guesstimate}
            guesstimateForm={this.props.guesstimateForm}
            metricFocus={this.props.metricFocus}
            metricId={this.props.metricId}
            onSubmit={this.props.onChangeGuesstimate}
            ref='form'
            value={this.props.guesstimate.input}
        />

      <DistributionModal
          closeModal={this.closeModal.bind(this)}
          guesstimate={this.props.guesstimate}
          isOpen={this.state.modalIsOpen}
          onSubmit={this.submitModal.bind(this)}
      />
    </div>
    )
  }
};

