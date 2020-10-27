import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import { ArticleThumbnail } from 'Components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

describe('ArticleThumbnail', () => {
  let props = {};
  const mock = jest.fn();
  beforeAll(() => {
    props = {
      title: 'Title',
      description: 'Description',
      onPress: mock,
      urlToImage: 'https://fakeurl.com/someimageurl.jpg',
    };
  });

  it('doesn\t crash without props', () => {
    const tree = renderer.create(<ArticleThumbnail onPress={mock} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    const tree = renderer.create(<ArticleThumbnail {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('triggers onPress correctly', () => {
    const tree = renderer.create(<ArticleThumbnail {...props} />);
    const container = tree.root.findByType(TouchableWithoutFeedback);
    renderer.act(() => {
      container.props.onPress();
    });
    expect(mock).toHaveBeenCalled();
  });
});
