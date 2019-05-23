import PropTypes from 'prop-types';

export const navigationPropTypes = PropTypes.shape({
  openDrawer: PropTypes.func,
  navigate: PropTypes.func,
  getParam: PropTypes.func,
  goBack: PropTypes.func,
});

export const navigationDefaultProps = {
  openDrawer: () => {},
  navigate: () => {},
  getParam: () => {},
  goBack: () => {},
};
