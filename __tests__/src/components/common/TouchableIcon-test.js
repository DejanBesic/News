import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import { TouchableIcon } from 'Components';
import { TouchableOpacity } from 'react-native-gesture-handler';

describe('TouchableIcon', () => {
  let props = {};
  const mock = jest.fn();
  beforeAll(() => {
    props = {
      name: 'menu',
      size: 20,
      onPress: mock,
      color: 'black',
    };
  });

  it('doesn\t crash without props', () => {
    const tree = renderer.create(<TouchableIcon onPress={mock} name="menu" />);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    const tree = renderer.create(<TouchableIcon {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('triggers onPress correctly', () => {
    const tree = renderer.create(<TouchableIcon {...props} />);
    const container = tree.root.findByType(TouchableOpacity);
    renderer.act(() => {
      container.props.onPress();
    });
    expect(mock).toHaveBeenCalled();
  });
});
