import { Menu, Text } from '@mantine/core';
import { IconArrowAutofitUp, IconPencil } from '@tabler/icons';
import FloatingButton from '@components/common/FloatingButton';

/**
 * FloatingButton과
 * FloatingButton을 눌렀을 때 나오는 Item들
 * Item 별로 필요한 로직들을 정의한다.
 */
interface Props {
  /**
   * 유저 인증 여부를 넘겨준다.
   */
  authorized?: boolean;
}

const PageUtilButton = ({ authorized = false }: Props) => {
  return (
    <FloatingButton>
      <Menu.Item
        p="md"
        icon={<IconArrowAutofitUp color="black" size={20} />}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Text fz="md" fw={500}>
          상단으로 이동
        </Text>
      </Menu.Item>
      {authorized && (
        <Menu.Item p="md" icon={<IconPencil color="black" size={20} />}>
          <Text fz="md" fw={500}>
            게시글 작성
          </Text>
        </Menu.Item>
      )}
    </FloatingButton>
  );
};

export default PageUtilButton;
