import React from 'react';
import ClustersTable from './ClustersTable';
import clusters from './clusters.json';
import {
  Col,
  Container,
  Content,
  Divider,
  Footer,
  Grid,
  Header,
  Icon,
  IconButton,
  Panel,
  Row,
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

class ClustersPage extends React.Component {
  render() {
    return (
      <Container style={{paddingRight: 20, paddingTop: 30}}>
        <Header>
        <Grid fluid>
          <Row>
          <Col xs={18}>
            <div style={headerStyles}>
            <h2 style={headerHeadlineStyles}>Clusters</h2>
            </div>
          </Col>
          <Col xs={6} style={{textAlign: 'right'}}>
            <IconButton icon={<Icon icon="plus-square" />} size='lg'>Add Cluster</IconButton>
          </Col>
          </Row>
        </Grid>
        <Divider />
        </Header>
        <Content>

        <Panel className='singlestat' header="Clusters" bordered>
          <span className='number'>5</span>
        </Panel>

        <Panel className='singlestat' header="Worker Nodes" bordered>
          <span className='number'>46</span>
        </Panel>

        <Panel className='singlestat' header="CPUs" bordered>
          <span className='number'>184</span>
        </Panel>

        <Panel className='singlestat' header="RAM" bordered>
          <span className='number'>386</span> <span className='unit'>GB</span>
        </Panel>

        <Panel className='singlestat' header="Release Versions" bordered>
          <span className='number'>5</span>
        </Panel>

        <Panel className='singlestat' header="Kubernetes Versions" bordered>
          <span className='number'>3</span>
        </Panel>

        <Divider/>
        
        <ClustersTable clusters={clusters} />

        <Panel className='gs-automation-panel' collapsible header={<><i className='fa fa-shell' /> Automation &mdash; How to list clusters programmatically</>}>
          <h5>gsctl <InfoPopover text="gsctl is the CLI for the Giant Swarm Rest API" /></h5>
          <p><code>gsctl login email@example.com --endpoint https://api.g8s.foobar.eu-west.aws.gigantic.io</code></p>
          <p><code>gsctl list clusters</code></p>
          <p><a href="https://docs.giantswarm.io/reference/gsctl/list-clusters/"><Icon icon='book' /> Reference</a></p>
          <Divider />
          <h5>Rest API <InfoPopover text="The Rest API allows programmatic access to many Giant Swarm resources, on all providers and for all release versions."/></h5>
          <p><code>GET https://api.g8s.foobar.eu-west.aws.gigantic.io/v4/clusters/</code></p>
          <p><a href="https://docs.giantswarm.io/api/#operation/getClusters"><Icon icon='book' /> Reference</a></p>
          <Divider />
          <h5>kubectl gs <InfoPopover text="kubectl gs is a plug-in for kubectl, facilitating the use of the Control Plane Kubernetes API."/></h5>
          <p><code>kgs get clusters</code></p>
          <p><a href="https://docs.giantswarm.io/reference/kubectl-gs/get-clusters/"><Icon icon='book' /> Reference</a></p>
          <Divider />
          <h5>Control Plane K8s API <InfoPopover text="The Control Plane Kubernetes API allows for low-level declarative automation. Support depend on the provider and cluster release version."/></h5>
          <p><code>kubectl get clusters.cluster.x-k8s.io</code></p>
          <p><code>kubectl get awsclusters.infrastructure.giantswarm.io</code></p>
          <p><Icon icon='book' /> Reference: <code><a href="https://docs.giantswarm.io/reference/cp-k8s-api/awsclusters.infrastructure.giantswarm.io/">AWSCluster</a></code>, <code><a href="https://docs.giantswarm.io/reference/cp-k8s-api/clusters.cluster.x-k8s.io/">Cluster</a></code></p>
        </Panel>
        
        </Content>
        <Footer style={{paddingTop: 40, paddingBottom: 20, fontSize: 14, color: '#aaa'}}>
          This is a design exploration preview for the Giant Swarm Web UI.
        </Footer>
      </Container>
    )
  }
}

export default ClustersPage;
