import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const addIdToObject = (obj) => ({
  ...obj,
  id: uuidv4(),
});

export const addIdsToListOfObjects = (list) =>
  list && Array.isArray(list) && list.map((item) => addIdToObject(item));
