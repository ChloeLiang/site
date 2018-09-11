import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { compose, withHandlers, withState, defaultProps } from 'recompose';

const Clipboard = ({ text, copied, tooltip, onCopy, children, ...props }) => (
  <Tooltip open={copied} title={tooltip} position="top" arrow>
    <CopyToClipboard onCopy={onCopy} text={text}>
      {children}
    </CopyToClipboard>
  </Tooltip>
);

const onCopy = props => () => {
  props.showCopyTooltip(true);

  setTimeout(() => {
    props.showCopyTooltip(false);
  }, 2000);
};

Clipboard.propTypes = {
  copied: PropTypes.bool,
  tooltip: PropTypes.string,
  onCopy: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Clipboard.defaultProps = {
  copied: false,
  tooltip: '',
};

export default compose(
  defaultProps({ tooltip: 'Copied to clipboard!' }),
  withState('copied', 'showCopyTooltip', false),
  withHandlers({ onCopy }),
)(Clipboard);
