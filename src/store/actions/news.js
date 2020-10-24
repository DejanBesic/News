export const TEST = 'TEST';

export const onTestChange = (payload) => ({ payload, type: TEST });
export const onTest = (newValue) => (dispatch) => {
  dispatch(onTestChange(newValue));
};
