import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Colors from '@theme/Colors';

type GapProps = {
  height?: number;
  width?: number;
  backgroundColor?: string;
  customStyle?: StyleProp<ViewStyle>;
};

const Gap: React.FC<GapProps> = ({
  height,
  width,
  backgroundColor = Colors.WHITE,
  customStyle,
}: GapProps) => (
  <View style={{height, width, backgroundColor, ...(customStyle as object)}} />
);

export default Gap;
