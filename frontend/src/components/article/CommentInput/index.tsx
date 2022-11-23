import { useRef } from 'react';
import { CommentInputWrapper } from './styles';
import { TextInput, ActionIcon } from '@mantine/core';
import { IconSend } from '@tabler/icons';

const CommentInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmitComment = () => {
    alert('댓글 입력');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  return (
    <CommentInputWrapper>
      <TextInput
        size="lg"
        placeholder="댓글을 입력해주세요."
        ref={inputRef}
        rightSection={
          <ActionIcon variant="transparent" color="indigo" onClick={handleSubmitComment}>
            <IconSend size={24} />
          </ActionIcon>
        }
        rightSectionWidth={48}
      />
    </CommentInputWrapper>
  );
};

export default CommentInput;