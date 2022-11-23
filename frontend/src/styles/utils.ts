import { CreateStyled } from '@emotion/styled';

const transientOptions: Parameters<CreateStyled>[1] = {
  shouldForwardProp: (propName: string) => !propName.startsWith('$'),
};

export { transientOptions };
