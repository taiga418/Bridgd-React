import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

export const fields = ['roomName', 'password'];

const propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

class LoginForm extends Component {
  render() {
    const {
      fields: {firstName, lastName, email, sex, favoriteColor, employed, notes},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;
    return (
      <div>
        <div className="pen-title">
          <h1>Bridgd</h1>
        </div>
        <div className="module form-module">
          <div className="toggle" onClick={()=>toggleForm.call(this, 'new')}>
            <i className="material-icons">add_box</i>
            <div className="tooltip">New</div>
          </div>
          <div className="form">
            <h2>Login to a room</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>First Name</label>
                <div>
                  <input type="text" placeholder="Username" {...firstName}/>
                </div>
              </div>
              <div>
                <label>Last Name</label>
                <div>
                  <input type="text" placeholder="password" {...lastName}/>
                </div>
              </div>
                <button type="submit" disabled={submitting}>
                  {submitting ? <i/> : <i/>} Submit
                </button>
                <button type="button" disabled={submitting} onClick={resetForm}>
                  Clear Values
                </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.PropTypes = propTypes;

export default reduxForm({
  form: 'login',
  fields
})(LoginForm);
