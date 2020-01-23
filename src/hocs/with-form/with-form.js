import React, {PureComponent} from 'react';

const withForm = (defaultFormData = {}) => (Component) => {
  class WithForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        formData: defaultFormData
      };

      this._handleInputChange = this._handleInputChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        formData={this.state.formData}
        onInputChange={this._handleInputChange}
      />;
    }

    _handleInputChange(event) {
      const target = event.target;
      const value = target.type === `checkbox` ?
        target.checked : target.value;
      const name = target.name;

      this.setState({
        formData: Object.assign({}, this.state.formData, {[name]: value}),
      });
    }
  }

  return WithForm;
};

export default withForm;
