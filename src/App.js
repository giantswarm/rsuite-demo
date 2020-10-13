import React from 'react';
import AppsPage from './AppsPage';
import ClustersPage from './ClustersPage';
import logo from './svg/logo-white.svg';
import {
  Affix,
  Container,
  Dropdown,
  Icon,
  Nav,
  Navbar,
  Sidebar,
  Sidenav,
} from 'rsuite';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const brandHeaderStyles = {
  textAlign: 'left',
  paddingTop: 28,
  paddingLeft: 13,
  paddingBottom: 10,
  paddingRight: 60,
  height: 108,
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

const logoStyles = {
  maxWidth: '100%',
  height: 'auto',
};

const iconStyles = {
  width: 56,
  height: 56,
  lineHeight: '56px',
  textAlign: 'center'
};


const NavToggle = ({ expand,
  onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Navbar.Body>
        <Nav>
          <Dropdown
            placement="topStart"
            trigger="click"
            renderTitle={children => {
              return <Icon style={iconStyles} icon="cog" />;
            }}
          >
            <Dropdown.Item>Help</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </Nav>

        <Nav pullRight>
          <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
            <Icon icon={expand ? 'angle-left' : 'angle-right'} />
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: true
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle() {
    this.setState({
      expand: !this.state.expand
    });
  }
  render() {
    const { expand } = this.state;
    return (
      <div className="sidebar-page" style={{height:'100vh'}}>
        <Router>
          <Container style={{height: '100%'}}>
            <Affix>
              <Sidebar
                style={{ display: 'flex', flexDirection: 'column' }}
                width={expand ? 260 : 56}
                collapsible
              >
                <Sidenav.Header>
                  <div style={brandHeaderStyles}>
                    <img src={logo} style={logoStyles} alt='Giant Swarm' />
                  </div>
                </Sidenav.Header>
                <Sidenav
                  expanded={expand}
                  defaultOpenKeys={[]}
                  appearance="subtle"
                >
                  <Sidenav.Body>
                    <Nav>
                      <Nav.Item eventKey="clusters" active icon={<Icon icon="dashboard" />}>
                        <Link to='/'>Clusters</Link>
                      </Nav.Item>
                      <Nav.Item eventKey="apps" icon={<Icon icon="magic" />}>
                        <Link to='/apps/'>Apps</Link>
                      </Nav.Item>
                      <Nav.Item eventKey="releases" icon={<Icon icon="tags" />}>
                        Releases
                      </Nav.Item>
                      <Dropdown
                        eventKey="3"
                        title="Organizations"
                        icon={<Icon icon="group" />}
                        placement="rightStart"
                      >
                        <Dropdown.Item eventKey="3-1">acme</Dropdown.Item>
                        <Dropdown.Item eventKey="3-2">giantswarm</Dropdown.Item>
                        <Dropdown.Item eventKey="3-3">MyOtherTestOrg</Dropdown.Item>
                        <Dropdown.Item eventKey="3-4">some-different-team</Dropdown.Item>
                        <Dropdown.Item
                          eventKey="3-5"
                          icon={<Icon icon="plus-square" />}>
                          Add Organization
                        </Dropdown.Item>
                      </Dropdown>
                      <Dropdown
                        eventKey="4"
                        title="Documentation"
                        icon={<Icon icon="book" />}
                        placement="rightStart"
                      >
                        <Dropdown.Item eventKey="4-1">Docs Home</Dropdown.Item>
                        <Dropdown.Item eventKey="4-2">Basics</Dropdown.Item>
                        <Dropdown.Item eventKey="4-3">Guides</Dropdown.Item>
                        <Dropdown.Item eventKey="4-4">Reference</Dropdown.Item>
                      </Dropdown>
                    </Nav>
                  </Sidenav.Body>
                </Sidenav>
                <NavToggle expand={expand} onChange={this.handleToggle} />
              </Sidebar>
            </Affix>

            <Switch>
              <Route path="/apps/">
                <AppsPage />
              </Route>
              <Route path="/">
                <ClustersPage />
              </Route>
            </Switch>

          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
