import { useState, ReactNode } from 'react';
import { Menu } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

import { FABWrapper, StyledIconPlus } from './styles';

interface Props {
  /**
   * 플로팅 버튼을 눌렀을 때 나오는 요소들을 넣는다.
   */
  children: ReactNode;
}

const FloatingButton = ({ children }: Props) => {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  return (
    <Menu position="top-end" transition="rotate-right" transitionDuration={200}>
      <Menu.Target>
        <FABWrapper
          color="indigo"
          variant="filled"
          radius="xl"
          size={48}
          onClick={() => setOpened((o) => !o)}
          ref={ref}
        >
          <StyledIconPlus size={24} opened={opened ? 'opened' : null} />
        </FABWrapper>
      </Menu.Target>
      <Menu.Dropdown>{children}</Menu.Dropdown>
    </Menu>
  );
};

export default FloatingButton;
