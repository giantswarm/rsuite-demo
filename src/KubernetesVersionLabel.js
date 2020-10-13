import React from 'react';
import semverCompare from './lib/semverCompare';
import {Tag, Whisper, Tooltip } from 'rsuite';

const KubernetesVersionLabel = ({version, hidePatchVersion}) => {
  let versionLabel = 'n/a';
  let eol = null;

  if (version) {
    versionLabel = version;
    if (hidePatchVersion) {
      const v = version.split('.');
      versionLabel = [v[0], v[1]].join('.');
    }

    // Assuming 1.16 is the latest EOL version
    if (semverCompare(version, '1.16.0') > 0) {
      eol = false;
    } else {
      eol = true;
    }
  }

  return (
    <span>
      <i className='fa fa-kubernetes' title='Kubernetes version' />{' '}
      {versionLabel}{eol && <Whisper speaker={<Tooltip>End of life: this version is no longer maintained by the Kubernetes project</Tooltip>}><span>{' '}<Tag style={{backgroundColor: '#381b15'}}>EOL</Tag></span></Whisper>}
    </span>
  );
};

export default KubernetesVersionLabel;
