import PropTypes from 'prop-types';
import React from 'react';
import ColorHash from 'color-hash';
import { Tag, Whisper, Tooltip } from 'rsuite';

let colorHashOptions = {
  lightness: 0.4,
  saturation: 0.7,
};
const hasher = new ColorHash(colorHashOptions);

let tooltip = 'Click to copy';

const ClusterIDLabel = ({ clusterID }) => {
  const color = hasher.hex(clusterID);
  const LabelStyles = {
    color: '#000000',
    backgroundColor: color,
    fontFamily: 'Inconsolata',
    padding: '0.1em 0.4em',
    borderRadius: '0.2em',
    fontSize: 15,
    cursor: 'pointer',
  };

  const handleClick = () => {
    console.log("handleClick")
    tooltip = 'Copied!';
  };

  return (
    <Whisper speaker={<Tooltip>{tooltip}</Tooltip>}>
      <Tag style={LabelStyles} onClick={handleClick}>
        {clusterID}
      </Tag>
    </Whisper>
  );
};

ClusterIDLabel.propTypes = {
  clusterID: PropTypes.string,
};

export default ClusterIDLabel;
