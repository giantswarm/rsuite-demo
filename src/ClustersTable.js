//import { relativeDate } from 'lib/helpers';
import prettyDate from './lib/prettyDate';
import semverCompare from './lib/semverCompare';
import PropTypes from 'prop-types';
import React from 'react';
import { ButtonToolbar, Checkbox, Col, Grid, Drawer, Icon, IconButton, Loader, Progress, Row, Table, Tag, Tooltip, Whisper } from 'rsuite';
import ClusterIDLabel from './ClusterIDLabel';
import KubernetesVersionLabel from './KubernetesVersionLabel';

const { Column, HeaderCell, Cell } = Table;
const { Line } = Progress;

const ClusterIDCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    <ClusterIDLabel clusterID={rowData[dataKey]} copyEnabled={false} />
  </Cell>
);

const KubernetesVersionCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    <KubernetesVersionLabel version={rowData[dataKey]} />
  </Cell>
);

const ClusterCreationCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    <Whisper placement='auto' trigger='hover' speaker={<Tooltip>{rowData[dataKey]}</Tooltip>}>
      <span>{prettyDate(rowData[dataKey])}</span>
    </Whisper>
  </Cell>
);

const MemoryCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    <Line strokeWidth={4} percent={(rowData[dataKey] / props.max) * 100.0} showInfo={false} strokeColor="#ffc107" />
  </Cell>
);

const CPUCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    <Line strokeWidth={4} percent={(rowData[dataKey] / props.max) * 100.0} showInfo={false} strokeColor="#5d42b6" />
  </Cell>
);

const WorkersCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    <Line strokeWidth={4} percent={(rowData[dataKey] / props.max) * 100.0} showInfo={false} />
  </Cell>
);

const ConditionCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    {rowData[dataKey] === 'Created' && <span style={{textTransform: 'uppercase', color: '#ccc'}}>Normal</span>}
    {rowData[dataKey] === 'Updating' && <span style={{textTransform: 'uppercase', color: '#ff'}}><Loader size="sm" content="UPDATING"/></span>}
  </Cell>
)

const MastersCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    {rowData[dataKey] === 3 && <Whisper speaker={<Tooltip>High availability master nodes</Tooltip>}><Tag color='green' style={{color: '#000'}}>HA</Tag></Whisper>}
    {rowData[dataKey] === 1 && <Whisper speaker={<Tooltip>Single master node</Tooltip>}><Tag color='violet'>SINGLE</Tag></Whisper>}
  </Cell>
)

class ClustersTable extends React.Component {
  constructor(props) {
    super(props);
    const data = props.clusters;

    let maxMemory = 0;
    let maxCPU = 0;
    let maxWorkers = 0;

    data.forEach((item) => {
      maxMemory = Math.max(maxMemory, item.memory);
      maxCPU = Math.max(maxCPU, item.cpus);
      maxWorkers = Math.max(maxWorkers, item.worker_nodes)
    });

    this.state = {
      sortColumn: 'id',
      sortType: 'asc',
      showSettings: false,
      columnsVisible: {
        id: true,
        name: true,
        release_version: true,
        kubernetes_version: true,
        owner: true,
        created: true,
        worker_nodes: true,
        cpus: true,
        memory: true,
        condition: true,
        masters: true,
      },
      maxValues: {
        memory: maxMemory,
        cpus: maxCPU,
        worker_nodes: maxWorkers,
      },
      data,
    };
    this.handleSortColumn = this.handleSortColumn.bind(this);
  }

  // Load data initially
  getData() {
    const { data, sortColumn, sortType } = this.state;

    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        const x = a[sortColumn];
        const y = b[sortColumn];

        if (
          sortColumn === 'release_version' ||
          sortColumn === 'kubernetes_version'
        ) {
          if (sortType === 'asc') {
            return semverCompare(x, y);
          }

          return semverCompare(y, x);
        }

        if (sortType === 'asc') {
          if (x > y) {
            return 1;
          }

          return -1;
        }

        if (x > y) {
          return -1;
        }

        return 1;
      });
    }

    return data;
  }

  handleSortColumn = (sortColumn, sortType) => {
    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.setState({
        sortColumn,
        sortType,
        loading: false,
      });
    }, 100);
  }

  showSettings = () => {
    this.setState({showSettings: true});
  }

  hideSettings = () => {
    this.setState({showSettings: false});
  }

  toggleColumn = (value, checked, evt) => {
    const { columnsVisible } = { ...this.state }
    columnsVisible[value]= checked;
    this.setState({"columnsVisible": columnsVisible});
  }

  isColumnChecked = (col) => {
    return this.state.columnsVisible[col];
  }

  render() {
    return (
      <Grid fluid>
        <Row style={{paddingBottom: 10}}>
          <Col style={{textAlign: 'right'}}>
            <ButtonToolbar size='sm'>
              <Whisper placement='auto' trigger='hover' speaker={<Tooltip>Customize table settings</Tooltip>}>
                <IconButton icon={<Icon icon="cog" />}  size='sm' onClick={this.showSettings}/>
              </Whisper>
            </ButtonToolbar>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              affixHorizontalScrollbar
              autoHeight
              className='clusters-table'
              data={this.getData()}
              loading={this.state.loading}
              onSortColumn={this.handleSortColumn}
              rowClassName='rs-table-row-cursor-pointer'
              rowHeight={60}
              rowKey='id'
              sortColumn={this.state.sortColumn}
              sortType={this.state.sortType}
            >
              {this.state.columnsVisible['id'] && <Column width={90} resizable sortable fixed verticalAlign='middle'>
                <HeaderCell>Id</HeaderCell>
                <ClusterIDCell dataKey='id' />
              </Column>}
              {this.state.columnsVisible['name'] && <Column width={200} resizable sortable verticalAlign='middle'>
                <HeaderCell>Name</HeaderCell>
                <Cell dataKey='name' />
              </Column>}
              {this.state.columnsVisible['release_version'] && <Column width={120} resizable align='center' sortable verticalAlign='middle'>
                <HeaderCell>Release</HeaderCell>
                <Cell dataKey='release_version' />
              </Column>}
              {this.state.columnsVisible['kubernetes_version'] && <Column width={120} resizable align='center' sortable verticalAlign='middle'>
                <HeaderCell>Kubernetes</HeaderCell>
                <KubernetesVersionCell dataKey='kubernetes_version' />
              </Column>}
              {this.state.columnsVisible['owner'] && <Column width={140} resizable align='center' sortable verticalAlign='middle'>
                <HeaderCell>Organization</HeaderCell>
                <Cell dataKey='owner' />
              </Column>}
              {this.state.columnsVisible['created'] && <Column width={120} resizable align='center' sortable verticalAlign='middle'>
                <HeaderCell>Created</HeaderCell>
                <ClusterCreationCell dataKey='created' />
              </Column>}
              {this.state.columnsVisible['worker_nodes'] && <Column width={140} resizable sortable verticalAlign='middle'>
                <HeaderCell>Workers</HeaderCell>
                <WorkersCell dataKey='worker_nodes' max={this.state.maxValues.worker_nodes} />
              </Column>}
              {this.state.columnsVisible['cpus'] && <Column width={140} resizable sortable verticalAlign='middle'>
                <HeaderCell>CPUs</HeaderCell>
                <CPUCell dataKey='cpus' max={this.state.maxValues.cpus} />
              </Column>}
              {this.state.columnsVisible['memory'] && <Column width={140} resizable sortable verticalAlign='middle'>
                <HeaderCell>RAM</HeaderCell>
                <MemoryCell dataKey='memory' max={this.state.maxValues.memory} />
              </Column>}
              {this.state.columnsVisible['condition'] && <Column width={140} resizable sortable verticalAlign='middle'>
                <HeaderCell>Condition</HeaderCell>
                <ConditionCell dataKey='condition' />
              </Column>}
              {this.state.columnsVisible['masters'] && <Column width={100} resizable align='center' sortable verticalAlign='middle'>
                <HeaderCell>Masters</HeaderCell>
                <MastersCell dataKey='masters' />
              </Column>}
            </Table>

            <Drawer
              show={this.state.showSettings}
              onHide={this.hideSettings}
              backdrop={false}
            >
              <Drawer.Header>
                <Drawer.Title>Customize table settings</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <p>Select the columns to display</p>
                <Checkbox value='id' onChange={this.toggleColumn} checked={this.isColumnChecked('id')}> ID</Checkbox>
                <Checkbox value='name' onChange={this.toggleColumn} checked={this.isColumnChecked('name')}> Name</Checkbox>
                <Checkbox value='release_version' onChange={this.toggleColumn} checked={this.isColumnChecked('release_version')}> Release version</Checkbox>
                <Checkbox value='kubernetes_version' onChange={this.toggleColumn} checked={this.isColumnChecked('kubernetes_version')}> Kubernetes version</Checkbox>
                <Checkbox value='owner' onChange={this.toggleColumn} checked={this.isColumnChecked('owner')}> Organization</Checkbox>
                <Checkbox value='created' onChange={this.toggleColumn} checked={this.isColumnChecked('created')}> Created</Checkbox>
                <Checkbox value='worker_nodes' onChange={this.toggleColumn} checked={this.isColumnChecked('worker_nodes')}> Workers</Checkbox>
                <Checkbox value='cpus' onChange={this.toggleColumn} checked={this.isColumnChecked('cpus')}> CPUs</Checkbox>
                <Checkbox value='memory' onChange={this.toggleColumn} checked={this.isColumnChecked('memory')}> RAM</Checkbox>
                <Checkbox value='condition' onChange={this.toggleColumn} checked={this.isColumnChecked('condition')}> Condition</Checkbox>
                <Checkbox value='masters' onChange={this.toggleColumn} checked={this.isColumnChecked('masters')}> Masters</Checkbox>
              </Drawer.Body>
            </Drawer>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ClustersTable.propTypes = {
  clusters: PropTypes.arrayOf(PropTypes.object),
};

export default ClustersTable;
