var React = require('react');
var ReactDOM = require('react-dom');

var Ajax = (require('./ajax-functions.js'));

var Masonry = require('react-masonry-component');

var Pic = require('./pic.jsx');
var Nav = require('./navbar.jsx');

var appUrl = window.location.origin;

var App = React.createClass({
  componentDidMount: function () {
    var self = this;
    Ajax.get(appUrl + '/api/user', function(err, user) {
      if(user.status !== 'unauthenticated') {
        self.setState({
          user: user,
          loggedIn: true
        })
      } else {
        self.setState({
          user: {github:{username: 'guest'}},
          loggedIn: false
        });
      }
      self.getAllPics();
    });
  },
  getAllPics: function() {
    var self = this;
    this.setState({pics:[], loading:true});
    Ajax.get(appUrl + '/api/pics', function(err, data) {
      self.setState({pics: data, page: 'all', loading: false});
    });
  },
  getUserPicsbyId: function(id, cb) {
    Ajax.get(appUrl + '/api/pics/' + id, function(err, data) {
      cb(data);
    }.bind(this));
  },
  getUserPics: function(index) {
    this.setState({pics:[], loading:true});
    var id = this.state.pics[index].ownerId._id;
    this.getUserPicsbyId(id, function(pics) {
      this.setState({pics: pics, page: 'user', loading: false});
    }.bind(this));
  },
  createPic: function (url, desc) {
    if(!url) return
    desc = desc || 'a pic by @' + this.state.user.github.username;
    console.log(url, desc);
    Ajax.post( appUrl + '/api/pics', {url: url, description: desc}, 
      function(err, d) {
        if(err) {return console.log(err)}
      var pics = this.state.pics;
      pics.unshift(d);
      this.setState({pics: pics});
    }.bind(this))
  },
  likeHandler: function(index) {
    var self = this;
    var id = this.state.pics[index]._id;
    var liked = (this.state.pics[index].likers.indexOf(this.state.user._id) !== -1)
    var verbFn = liked ? Ajax.put : Ajax.post;
    this.setState({picLoading: index});
    verbFn(appUrl + '/api/pics/' + id, {},  function(err, d){
      var pics = self.state.pics;
      if(liked) {
        var i = d.likers.indexOf(self.state.user._id);
        d.likers.splice(i,1);
        pics[index].likers = d.likers;
      } else {
        d.likers.push(self.state.user._id);
        pics[index].likers = d.likers;
      }
      if(!self.state.loading) {
        self.setState({pics: pics, picLoading: undefined});
      }
    })
  },
  deletePic: function(index) {
    var self = this;
    var id = this.state.pics[index]._id;
    Ajax.delete(appUrl + '/api/pics/' + id, {}, function(err, d){
      var pics = self.state.pics;
      pics.splice(index,1);
      self.setState({pics: pics});
    })
  },
  getInitialState : function () {
    return {user: {github:{}}, page: 'all', pics:[]}
  },
  imgReplacer: function(e) {
    e.target.src = "https://cdn.freecodecamp.org/demo-projects/images/placeholder.png";
  },
    idReplacer: function(e) {
    e.target.src = "https://cdn.freecodecamp.org/demo-projects/images/ghb_32.png";
  },
  setPage: function  (page) {
    var self = this;
    switch (page) {
      case 'all' :
        this.getAllPics();
        break;
      case 'myPics':
        var id = this.state.user._id;
        this.getUserPicsbyId(id, function(pics) {
          self.setState({pics: pics, page: 'myPics'});
        });
        break;
      default:
        break;
    }
  },
  render: function () {
    var hide = this.state.loading ? '' : ' c-hide';
    var self = this;
    var pics = this.state.pics.map(function(p, i) {
      console.log(p);
      return (
        <Pic
          key={i}
          imgUrl={p.url}
          description={p.description}
          ownerImg={p.ownerId.github.imageUrl}
          likeable={self.state.loggedIn }
          username={'@'+p.ownerId.github.username}
          getUserPics={self.getUserPics.bind(null,i)}
          liked={p.likers.indexOf(self.state.user._id) !== -1}
          deletable={self.state.loggedIn && self.state.page === 'myPics' && p.ownerId._id === self.state.user._id}
          likes={p.likers.length}
          like={self.likeHandler.bind(null,i)}
          delete={self.deletePic.bind(null,i)}
          imgReplacer={self.imgReplacer}
          idReplacer={self.idReplacer}
          loading={self.state.picLoading === i}
          userPicsDisabled={self.state.picLoading !== undefined}/>
        )
      });
    return (
      <div>
        <Nav
          submit={this.createPic}
          loggedIn={this.state.loggedIn}
          page={this.state.page}
          setPage={this.setPage}
          setPageDisabled={self.state.picLoading !== undefined}/>
        <div className="container">
          <div className={'preloader' + hide}>
            <img src="https://pinterest-clone.freecodecamp.repl.co/assets/preloader.gif"/>
          </div>
          <Masonry
            className={'grid'}
            options={
            {
              // options
              itemSelector: '.grid-item',
              columnWidth: 200,
              fitWidth: true
            }
          }>
            {pics}
          </Masonry>
        </div>
      </div>

    )
  }
});

ReactDOM.render(<App/>, document.getElementById('appView'));
