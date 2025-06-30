import { MAP_OBJECTS } from '@/constants/MapObjects.ts';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { addCategories, removeCategories, setRadius } from '@/store/slices/MapSlice.ts';

export const useSearchPanel = () => {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector(state => state.map);

  const handleRadiusChange = (value: string) => {
    if (!value) {
      return dispatch(setRadius(0));
    }

    if (Number.isInteger(parseInt(value))) {
      dispatch(setRadius(parseInt(value) * 1000));
    }
  };

  const handleCategoryClick = (category: string) => {
    const categoriesToLook = MAP_OBJECTS.find(object => object.name === category)?.categories || [];

    if (categories.some(c => categoriesToLook.includes(c))) {
      dispatch(removeCategories(categoriesToLook));
    } else {
      dispatch(addCategories(categoriesToLook));
    }
  };

  return {
    handleRadiusChange,
    handleCategoryClick,
  };
};
