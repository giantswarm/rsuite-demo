import React from 'react';
import appcatalog from './appcatalog.json';

import {
  Col,
  Container,
  Content,
  Divider,
  Footer,
  Grid,
  Header,
  Icon,
  Panel,
  Row,
  Tag,
  Tooltip,
  Whisper,
} from 'rsuite';

const headerStyles = {
  padding: 0,
};

const headerHeadlineStyles = {
  fontWeight: 100,
  fontSize: 30,
  lineHeight: '42px',
};

const InfoPopover = ({text}) => {
  return (
    <Whisper trigger='click' speaker={<Tooltip>{text}</Tooltip>}><Icon icon='question-circle2' style={{color: '#7b7b5e'}}/></Whisper>
  );
};

class AppsList extends React.Component {
  constructor(props) {
    super(props);

    let apps = [];
    Object.keys(props.data.entries).forEach((key) => {
      apps.push(props.data.entries[key][0]);
    });

    this.state = {
      apps: apps,
    };
  }

  render() {
    let apps = this.state.apps.map((app) => {
      return (
        <Panel key={app.name} shaded bordered bodyFill style={{ display: 'inline-block', width: 300, height: 400, margin: 20}}>
          <div style={{width: 300, height: 200, position: 'relative', backgroundColor: '#00314f'}}>
            <img src={app.icon} style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, margin: 'auto', maxWidth: '40%', maxHeight: '70%'}} alt="logo" />
          </div>
          <Panel>
            <strong>{app.name}</strong>
            <p>{app.description}</p>
            <Tag>Giant Swarm</Tag>
          </Panel>
        </Panel>
      );
    });

    return <div>{apps}</div>;
  }
}

class AppsPage extends React.Component {
  render() {
    return (
      <Container style={{paddingRight: 20, paddingTop: 30}}>
        <Header>
        <Grid fluid>
          <Row>
            <Col xs={24}>
              <div style={headerStyles}>
              <h2 style={headerHeadlineStyles}>Apps</h2>
              </div>
            </Col>
          </Row>
        </Grid>
        <Divider />
        </Header>
        <Content>
        
        <AppsList data={appcatalog} />

        <Panel className='gs-automation-panel' collapsible header={<><i className='fa fa-shell' /> Automation &mdash; How to list apps programmatically</>}>
          <h5>Rest API <InfoPopover text="The Rest API allows programmatic access to many Giant Swarm resources, on all providers and for all release versions."/></h5>
          <p><code>GET https://api.g8s.foobar.eu-west.aws.gigantic.io/v4/appcatalogs/</code></p>
          <p><a href="https://docs.giantswarm.io/api/#operation/getAppCatalogs"><Icon icon='book' /> Reference</a></p>
          <Divider />
          <h5>Control Plane K8s API <InfoPopover text="The Control Plane Kubernetes API allows for low-level declarative automation. Support depend on the provider and cluster release version."/></h5>
          <p><code>kubectl get appcatalogs</code></p>
          <p><Icon icon='book' /> Reference: <code><a href="https://docs.giantswarm.io/reference/cp-k8s-api/appcatalogs.application.giantswarm.io/">AppCatalog</a></code></p>
        </Panel>
        
        </Content>
        <Footer style={{paddingTop: 40, paddingBottom: 10, fontSize: 14}}>
          This is a design exploration preview for the Giant Swarm Web UI.
        </Footer>
      </Container>
    )
  }
}

export default AppsPage;
