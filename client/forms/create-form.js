// <div className="pen-title">
//   <h1>Bridgd</h1>
// </div>
// <div className="module form-module">
//   <div className="toggle" onClick={toggleForm.bind(this, 'login')}>
//     <i className="material-icons">account_box</i>
//     <div className="tooltip">Login</div>
//   </div>
//   <div className="form">
//     <h2>Create a Room</h2>
//     <form>
//       <input type="text" placeholder="Room Name"  value={newName} onChange={handleInputChange.bind(this, 'createForm', 'newName')}/>
//       <input type="password" placeholder="Password" value={newPassword} onChange={handleInputChange.bind(this, 'createForm', 'newPassword')}/>
//       <input type="password" placeholder="Password Confirmation" value={passwordConfirmation} onChange={handleInputChange.bind(this, 'createForm', 'passwordConfirmation')}/>
//       <button disabled={disabled || passwordCheck} onClick={(e) => handlSubmitCreate(e)}>Register</button>
//       {passwordCheck && <div className="error-text">Passwords Must Match</div>}
//       {!error.duplicate && error && <div className="error-text">Server Error, please try again</div>}
//       {error.duplicate && <div className="error-text">Room name unavailable</div>}
//     </form>
//   </div>
// </div>
