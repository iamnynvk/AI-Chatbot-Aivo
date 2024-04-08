import React from 'react';
import PropTypes from 'prop-types';
import {COLORS} from '../constants';

/**
 * Renders a svg image.
 *
 * @prop [style] - Style object for additional customization.
 * @prop size - Sets width and height in logical pixels.
 * @prop [width] - Width of the component in pixels.
 * @prop [height] - Height of the component in pixels.
 * @prop [icon] - Name of svg icon.
 */

export const SvgIcon = ({
  name,
  size,
  color,
  icon,
  width,
  height,
  ...rest
}: any) => {
  const iconMap: any = [];
  const Icon = name ? iconMap[name] : icon;

  if (width && height) {
    return (
      <Icon
        fill={color}
        width={width}
        height={height}
        style={[
          {
            width: size,
            height: size,
          },
        ]}
        {...rest}
      />
    );
  } else {
    return (
      <Icon fill={color} style={[{width: size, height: size}]} {...rest} />
    );
  }
};

SvgIcon.defaultProps = {
  size: '5em',
  color: COLORS.background,
};

SvgIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
