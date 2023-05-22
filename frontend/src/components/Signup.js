import React from 'react'



export default function Signup() {
  return (
    <div className='centered'>
        <form className="form-horizontal">
      
            {/* Name */}
  <div className="form-group">
    <label htmlFor="inputEmail3" className="col-sm-2 control-label">Name</label>
    <div className="col-sm-9">
      <input type="text" className="form-control" id="inputText" placeholder="John Doe" />
    </div>
  </div>

  {/* Email */}
  <div className="form-group">
    <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
    <div className="col-sm-9">
      <input type="email" className="form-control" id="inputEmail3" placeholder="John.Doe@xyz.com" />
    </div>
  </div>

    {/* Password */}
  <div className="form-group">
    <label htmlFor="inputPassword3" className="col-sm-3 control-label">Password</label>
    <div className="col-sm-9">
      <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
    </div>
  </div>

  {/* Address */}
  <div className="form-group">
    <label htmlFor="inputEmail3" className="col-sm-3 control-label">Address</label>
    <div className="col-sm-9">
      <input type="text" className="form-control" id="inputText" placeholder="Address" />
    </div>
  </div>

    {/* CNIC*/}
    <div className="form-group">
    <label htmlFor="inputEmail3" className="col-sm-2 control-label">CNIC</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="inputText" placeholder="John Doe" />
    </div>
  </div>


  <div className="form-group">
    <div className="col-sm-offset-2 col-sm-10">
      <button type="submit" className="btn btn-default">Sign Up</button>
    </div>
  </div>

  <p>
  Already have an account? <a href="/login"> Login </a> here
  </p>
</form>

    </div>
  )
}
