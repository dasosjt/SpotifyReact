import React from 'react'
import ReactDOM from 'react-dom'
import { Music, Plus, Shuffle, SkipBack, SkipForward, Repeat, PauseCircle, Search, DownloadCloud, Airplay, Volume1 } from 'react-feather'
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <div className="root">
      <div className="bg" />
      <div className="top-container">
        <NavBar />
        <MainView />
      </div>
      <PlayingBar />
    </div>
  </BrowserRouter>
)

const MainView = () => (
  <div className="main-view-container">
    <Route exact path="/" component={ () => (<div> Hello </div>) } />
    <Route path="/browse/" component={ BrowsePage } />
    <Route path="/search/" component={ SearchPage } />
    <Route path="/collection/" component={ () => (<div> Playlists </div>) } />
    <Route exact path="/download" component={ DownloadPage } />
    <Route exact path="/settings/account" component={ AcountPage } />
  </div>
)

const BrowsePage = ({ match }) => (
  <section>
    <nav className="contentMenu">
      <ul className="contentMenuCenter">
        <ContentMenuItem
          href={ "/browse/featured" }
          text={ "FEATURED" }/>
        <ContentMenuItem
          href={ "/browse/genres" }
          text={ "GENRES & MOODS" }/>
        <ContentMenuItem
          href={ "/browse/newreleases" }
          text={ "NEW RELEASES" }/>
        <ContentMenuItem
          href={ "/browse/discover" }
          text={ "DISCOVER" }/>
      </ul>
    </nav>
    <div>
      <div>
        <section>
          <Route exact path={ `${match.url}/featured` } component={ FeaturedPage } />
          <Route exact path={ `${match.url}/genres` } component={ GenresPage } />
          <Route exact path={ `${match.url}/newreleases` } component={ NewReleasesPage } />
          <Route exact path={ `${match.url}/discover` } component={ DiscoverPage } />
        </section>
      </div>
    </div>
  </section>
)

const MediaObject = ({ text, href, src }) => (
  <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2">
    <div className="media-object">
      <div className="media-object-hoverable">
        <div className="react-contextmenu-wrapper">
          <a className="cover-art shadow actionable">
            <div>
              <div className="icon">
                <Music size={ 80 }/>
              </div>
              <div className="cover-art-image cover-art-image-loaded" style={{ backgroundImage: `url(${src})` }}/>
            </div>
          </a>
        </div>
        <div className="mo-info">
          <div className="react-contextmenu-wrapper">
            <Link className="mo-info-name" title={ text } to={ href }>
              { text }
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const FeaturedPage = () => (
  <div>
    <div>
      <section>
        <div className="contentSpacing">
          <BrowserGrid title={ "Buenas Noches..." } list={ BrowserGridTest } />
          <BrowserGrid title={ "Jump Back In" } list={ BrowserGridTest } />
          <BrowserGrid title={ "Charts" } list={ BrowserGridTest } />
        </div>
      </section>
    </div>
  </div>
)

const GenresPage = () => (
  <div>
    <div>
      <section>
        <div className="contentSpacing">
          <BrowserGrid title={ "Genres & Moods" } list={ BrowserGridTest } />
        </div>
      </section>
    </div>
  </div>
)

const NewReleasesPage = () => (
  <div>
    <div>
      <section>
        <div className="contentSpacing">
          <BrowserGrid title={ "The Best New Releases" } list={ BrowserGridTest } />
          <BrowserGrid title={ "New Albums and Singles" } list={ BrowserGridTest } />
        </div>
      </section>
    </div>
  </div>
)

const DiscoverPage = () => (
  <div>
    <div>
      <section>
        <div className="contentSpacing">
          <BrowserGrid title={ "Playlist Made Just For You" } list={ BrowserGridTest } />
          <BrowserGrid title={ "Top Recommendations For You" } list={ BrowserGridTest } />
        </div>
      </section>
    </div>
  </div> 
)

const BrowserGridTest = [
  {text: "Sueño Profundo", href: "/", src: "https://i.scdn.co/image/3f431c7fde6a0adbe963e5aba4d67263e49d280c"},
  {text: "Bajo Las Estrellas", href: "/", src: "https://i.scdn.co/image/ddf7738582d34715418fb606c120a4c33f7ee02b"}
]

const BrowserGrid = ({ title, list }) => (
  <section>
    <h1 className="browserGridTitle">
      {title}
    </h1>
    <div className="container-fluid container-fluid--noSpaceAround">
      <div className="browserGrid">
        {
          typeof list !== 'undefined' ? 
          list.map((element, index) => (
            <MediaObject
              text={ element.text }
              href={ element.href }
              src={ element.src }
              key={ index } />    
          ))
          :
          ( null )
        }
      </div>
    </div>
  </section>
)

class SearchPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      input: ""
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  render(){
    return (
      <section>
        <div>
          <div className="inputBox">
            <div className="contentSpacing">
              <h4 className="inputBox-label"> 
                Search for an Artist, Song, Album or Playlist
              </h4>
              <input 
                className="inputBox-input" 
                value={ this.state.input } 
                placeholder="Start typing... " 
                type="text" 
                onChange={ this.handleChange } />
            </div>
          </div>
        </div>
        <nav className="contentMenu">
          <ul className="contentMenuCenter">
            <ContentMenuItem
              href={ "/" }
              text={ "RECENT SEARCHES" }/>
          </ul>
        </nav>
        <div className="search-bg contentSpacing">
          <div className="search-history">
            <ul>
              <SearchItem 
                href={ "/" }
                text={ "La Catedra" }
                type={ "ALBUM" }/>
              <SearchItem 
                href={ "/" }
                text={ "Residente" }
                type={ "ARTIST" }/>
              <SearchItem 
                href={ "/" }
                text={ "The Kooks" }
                type={ "ARTIST" }/>
            </ul>
          </div>
        </div>
      </section>
    )
  }
} 

const SearchItem = ({ href, text, type }) => (
  <li>
    <Link className="link-subtle" to={ href } >
      <h1 className="ellipsis-one-line"> { text } </h1>
      <span> { type } </span>
    </Link> 
  </li>
)

const ContentMenuItem = ({ href, text }) => (
  <li className="contentMenuInline">
    <NavLink className="menuItem" to={ href } activeClassName="selected">
      { text }
      <div className="active"/>
    </NavLink>
  </li>
)

const AcountPage = () => (
  <section className="accountPage">
    <div className="accountPage-bodyContainer">
      <div className="accountPage-body">
        <div>
          <img 
            className="accountPage-image"
            src="https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/18199565_10155250321454500_8272315564343484143_n.jpg?oh=7c47f262fee449fd12bce469f6be309d&oe=5A65C861" />
          <h1 className="accountTitle" >
            Diego Sosa
          </h1>
        </div>
        <div className="button-group button-group--vertical">
          <AccountButton
            href={ "https://www.spotify.com/account/?utm_source=play&utm_campaign=wwwredirect&utm_medium=stp_test" }
            text={ "VIEW ACCOUNT" } />
          <AccountButton
            href={ "https://www.spotify.com/home?utm_source=play&utm_campaign=wwwredirect&utm_medium=stp_test" }
            text={ "FULL WEBSITE" } />
          <AccountButton
            href={ "https://support.spotify.com?utm_source=play&utm_campaign=wwwredirect&utm_medium=stp_test" }
            text={ "HELP" } />
          <AccountButton
            href={ "" }
            text={ "LOG OUT" } />
        </div>
        <div className="footerLinks">
          <a className="footerLinks__item" href="https://www.spotify.com/legal/" target="_blank">Legal</a>
          <span className="footerLinks__divider">|</span>
          <a className="footerLinks__item" href="https://www.spotify.com/legal/privacy-policy/" target="_blank">Privacy</a>
          <span className="footerLinks__divider">|</span>
          <a className="footerLinks__item" href="https://www.spotify.com/legal/privacy-policy/#s13" target="_blank">Cookies</a>
          <span className="footerLinks__divider">|</span>
          <a className="footerLinks__item" href="https://www.spotify.com/legal/privacy-policy/#s13" target="_blank">About Ads</a>
        </div>        
      </div>
    </div>
  </section>
)

const AccountButton = ({ href, text }) => (
  <div className="button-group__item" >
    <a 
      className="btn btn-black btn-small" 
      target="_blank" 
      href={ href }
      style={{minWidth: 240 + 'px'}}>
      { text }
    </a>
  </div>
)

const DownloadPage = () => (
  <section className="downloadPage">
    <div className="downloadPage-inner">
      <img src="./img/mac.png" />
      <h1 className="downloadTitle" >
      Did you know about our awesome desktop app?
      </h1>
      <h2 className="downloadSubTitle" >
      Download for the best Spotify ever!
      </h2>
      <a className="btn btn-green" target="_blank" href="https://www.spotify.com/download">
      DOWNLOAD APP
      </a>
    </div>
  </section>
)

const NavBar = () => (
  <div className="nav-bar-container">
    <nav className="navBar" >
      <div className="navBar-expand">
        <ul>
          <Spotify />
          <SearchButton />
          <MainNavBar />
        </ul>
        <RecentlyPlayed />
      </div>
      <ul>
        <InstallButton />
      </ul>
      <SessionInfo />
    </nav>
  </div>
)

const SessionInfo = () => (
  <div className="sessionInfo">
    <div className="user-widget link-subtle ellipsis-one-line">
      <Link to="/settings/account">
        <figure className="avatar user-avatar" title="Diego Sosa" /> 
        <span className="user-link">Diego Sosa</span>
      </Link>
    </div>
  </div>
)

const InstallButton = () => (
  <li className="navBar-item navBar-item--with-icon download-item" >
    <IconButton 
      className="link-subtle navBar-link ellipsis-one-line"
      title="Search"
      href="/Download"
      iconClassName="icon download-icon"
      icon={ <DownloadCloud size={ 14 } /> }
      text={ "Install App" } />
  </li>
)

const RecentlyPlayed = () => (
  <div className="recently-played navBar-group">
    <h2 className="navBar-group-header">RECENTLY PLAYED</h2>
    <ul>
      <NavBarItem 
        liClassName={ "navBar-item navBar-item--small navBar-item--with-icon recently-played__item-1" }
        aClassName={ "navBar-link link-subtle ellipsis-one-line" }
        text={ "La Cátedra" }
        typeHeader={ "ALBÚM" }
        href={ "/" } />
      <NavBarItem 
        liClassName={ "navBar-item navBar-item--small navBar-item--with-icon recently-played__item-2" }
        aClassName={ "navBar-link link-subtle ellipsis-one-line" }
        text={ "The Kooks" }
        typeHeader={ "ARTISTA" } 
        href={ "/" } />
      <NavBarItem 
        liClassName={ "navBar-item navBar-item--small navBar-item--with-icon recently-played__item-3" }
        aClassName={ "navBar-link link-subtle ellipsis-one-line" }
        text={ "chill.out.brain" }
        typeHeader={ "PLAYLIST" } 
        href={ "/" } />
    </ul>
  </div>
)

const MainNavBar = () => (
  <div className="navBar-group">
    <NavBarItem 
      liClassName={ "navBar-item" }
      aClassName={ "link-subtle navBar-link ellipsis-one-line" }
      text={ "Home" }
      href={ "/browse/featured" }/>
    <NavBarItem 
      liClassName={ "navBar-item" }
      aClassName={ "link-subtle navBar-link ellipsis-one-line" }
      text={ "Your Music" }
      href={ "/collection/playlists" }/>
  </div>
)

const NavBarItem = ({ liClassName, aClassName, href, text, typeHeader }) => (
  <li className={ liClassName }>
    <Link className={ aClassName } to={ href }>
      {text}
      { typeHeader !== undefined && typeHeader.length > 0 ? (<span className="type"> { typeHeader } </span>) : (null)}
    </Link>
  </li>
)

const Spotify = () => (
  <div className="navBar-header">
    <Link className="logo" to="/browse/featured">
      <svg viewBox="0 0 167.5 167.5">
        <title>Spotify</title>
        <path
          fill="currentColor"
          d="M83.7 0C37.5 0 0 37.5 0 83.7c0 46.3 37.5 83.7 83.7 83.7 46.3 0 83.7-37.5 83.7-83.7S130 0 83.7 0zM122 120.8c-1.4 2.5-4.6 3.2-7 1.7-19.8-12-44.5-14.7-73.7-8-2.8.5-5.6-1.2-6.2-4-.2-2.8 1.5-5.6 4-6.2 32-7.3 59.6-4.2 81.6 9.3 2.6 1.5 3.4 4.7 1.8 7.2zM132.5 98c-2 3-6 4-9 2.2-22.5-14-56.8-18-83.4-9.8-3.2 1-7-1-8-4.3s1-7 4.6-8c30.4-9 68.2-4.5 94 11 3 2 4 6 2 9zm1-23.8c-27-16-71.6-17.5-97.4-9.7-4 1.3-8.2-1-9.5-5.2-1.3-4 1-8.5 5.2-9.8 29.6-9 78.8-7.2 109.8 11.2 3.7 2.2 5 7 2.7 10.7-2 3.8-7 5-10.6 2.8z">
        </path>
      </svg>
    </Link>
  </div>
)

const SearchButton = () => (
  <div className="navBar-group" >
    <li className="navBar-item navBar-item--with-icon" >
      <IconButton 
        className="link-subtle navBar-link ellipsis-one-line"
        title="Search"
        href="/search/recent"
        iconClassName="icon search-icon"
        icon={ <Search size={ 18 } /> }
        text={ "Search" } />
    </li>
  </div>
)

const PlayingBar = () => (
  <div className="nowPlayingBar-container">
    <footer className="now-playing-bar-container">
      <div className="now-playing-bar">
        <BarLeft />
        <BarCenter />
        <BarRight />
      </div>
    </footer>
  </div> 
)

const BarLeft = () => (
  <div className="now-playing-bar__left">
    <div className="now-playing">
      <CoverArt
        href={ "" }
        icon={ <Music /> } />
      <TrackInfo
        track_info={{ 
          artist: {name: "Residente", href: "/"}, 
          album: {name: "La Catedra", href: "/"} }} />
        <IconButton 
          className="control-button"
          title="Save to Your Music"
          href="/"
          iconClassName="icon"
          icon={ <Plus size={ 18 }/> } />
    </div>
  </div>
)


const IconButton = ({ href, icon, className, title, text, iconClassName }) => (
  <Link to={ href } className={ className } title={ title }>
    {text}
    <Icon icon={ icon } iconClassName={ iconClassName } />
  </Link>  
)


const Icon = ({ icon, iconClassName }) => (
  <div className={ iconClassName } >
    { icon }
  </div>
)

const CoverArt = ({ href, icon }) => (
  <Link to={ href }>
    <div className="cover-art shadow now-playing__cover-art">
      <div>
        <Icon icon={ icon } iconClassName="icon" />
        <div className="cover-art-image cover-art-image-loaded"/>
      </div>
    </div>
  </Link>
)

const TrackInfo = ({ track_info }) => (
  <div className="track-info ellipsis-one-line">
    <div className="track-info__name ellipsis-one-line">
      <div className="react-contextmenu-wrapper">
        <Link to={ track_info.album.href }>{ track_info.album.name } </Link>
      </div>
    </div>
    <div className="track-info__artists link-subtle ellipsis-one-line">
      <span>
        <span className="react-contextmenu-wrapper">
          <Link to={ track_info.artist.href }>{ track_info.artist.name } </Link>
        </span>
      </span>
    </div>
  </div>
)

const BarCenter = () => (
  <div className="now-playing-bar__center">
    <div className="player-controls">
      <div className="player-controls__buttons">
        <IconButton 
          className="control-button"
          title="Enable shuffle"
          href=""
          iconClassName="icon"
          icon={ <Shuffle size={ 12 } /> } />
        <IconButton 
          className="control-button"
          title="Previous"
          href=""
          iconClassName="icon"
          icon={ <SkipBack size={ 18 } /> } />
        <IconButton 
          className="control-button"
          title="Pause"
          href=""
          iconClassName="icon"
          icon={ <PauseCircle size={ 40 } /> } />
        <IconButton 
          className="control-button"
          title="Next"
          href=""
          iconClassName="icon"
          icon={ <SkipForward  size={ 18 }  /> } />
        <IconButton 
          className="control-button"
          title="Enable repeat"
          href=""
          iconClassName="icon"
          icon={ <Repeat  size={ 12 }  /> } />
      </div>
      <div className="playback-bar">
        <div style={{ width: '100%' }}>
          <ProgressBar size={ 256 }/>
        </div>
      </div>
    </div>
  </div>
)

const BarRight = () => (
  <div className="now-playing-bar__right">
    <div className="now-playing-bar__right__inner">
      <div className="extra-controls" >
        <span className="connect-device-picker">
          <IconButton 
            href="/"
            iconClassName="spoticon-devices-16 control-button"
            icon={ <Airplay size={ 16 } /> } />
        </span>
        <ProgressBar size={ 136 }/>
      </div> 
    </div>
  </div>
)

class ProgressBar extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      slider: 50,
    }
  }

  render(){
    return (
      <div className="volume-bar" style={{ width: `${this.props.size} px`}}>
        <IconButton
          href="/"
          iconClassName="spoticon-volume-16 control-button volume-bar__icon"
          icon={ <Volume1 size={ 16 } /> } />
        <div 
          className="progress-bar" 
          onClick={ (e) => { this.setState({ slider: e.nativeEvent.offsetX }) }} >
          <div className="middle-align progress-bar__bg" >
            <div className="progress-bar__fg" style={{ width: `${this.state.slider}%` }} />
            <div 
              className="middle-align progress-bar__slider"
              style={{ left: `${this.state.slider}%` }}
              draggable={ true }
              onDragEnd={ (e) => { this.setState({ slider: this.state.slider + e.nativeEvent.offsetX }) }} />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('main')
)