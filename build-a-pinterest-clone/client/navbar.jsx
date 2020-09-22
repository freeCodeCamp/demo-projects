var React = require('react');

module.exports = React.createClass({
  submit: function(e) {
    e.preventDefault();
    if(this.refs.url.value) {
      this.props.submit(this.refs.url.value, this.refs.desc.value);
      this.refs.url.value = '';
      this.refs.desc.value = '';
    }
  },
  render: function () {
    var hideIfLoggedOut = this.props.loggedIn ? '' : ' hide';
    var hideIfLoggedIn = this.props.loggedIn ? ' hide' : '';
    var dOL = this.props.setPageDisabled;
    var all = myPics = '';
    switch (this.props.page) {
      case 'all' :
        all = 'active';
        break;
      case 'myPics':
        myPics = 'active';
        break;
      default:
        break;
    }
    return (
      <nav className="navbar navbar-default">
        <div className="container">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              <img alt="Brand" src="https://cdn.freecodecamp.org/demo-projects/images/pinterest-logo.png" className="brand-img" title="Pic-terest"/>
            </a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className={all}><a href="#" onClick={dOL ? null : this.props.setPage.bind(null,'all')}>All <span className="sr-only">(current)</span></a></li>
              <li className={myPics + hideIfLoggedOut}><a href="#" onClick={dOL ? null : this.props.setPage.bind(null,'myPics')}>My Pics</a></li>
              <li className={'dropdown' + hideIfLoggedOut}>
                <a href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false">Add a Pic <span className="caret"></span>
                </a>
                <div className="dropdown-menu">
                  <form className="add-form" onSubmit={dOL ? null : this.submit}>
                    <input type="text" ref="url" placeholder="Pic url..." className="form-control"/>
                    <input type="text" ref="desc" placeholder="Pic description..." className="form-control"/>
                    <button type="submit" className="btn btn-primary btn-block">Send</button>
                  </form>
                </div>
              </li>
            </ul>
            <div className="nav navbar-nav navbar-right">
              <a
                href="/auth/github"
                className={"btn btn-default navbar-btn" + hideIfLoggedIn}>
                <img className="gh-icon" src="https://cdn.freecodecamp.org/demo-projects/images/ghb_32.png"/> Login
              </a>
              <a
                href="/logout"
                className={"btn btn-default navbar-btn" + hideIfLoggedOut}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
})
