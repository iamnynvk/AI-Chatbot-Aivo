import React from 'react';

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
        style={[{width: size, height: size}]}
        {...rest}
      />
    );
  } else {
    return (
      <Icon fill={color} style={[{width: size, height: size}]} {...rest} />
    );
  }
};
