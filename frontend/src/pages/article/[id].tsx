import { useState } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Avatar, Progress, TypographyStylesProvider } from '@mantine/core';
import { IconList } from '@tabler/icons';

import ParticipantsModal from '@components/article/ParticipantsModal';
import ParticipateButton from '@components/article/ParticipateButton';
import ArticleTag from '@components/common/ArticleTag';
import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import PageLayout from '@components/common/PageLayout';
import StatCounter from '@components/common/StatCounter';
import { ArticleStatusKr } from '@constants/article';
import { CategoryKr } from '@constants/category';
import { dummyArticle, dummyParticipants } from '@constants/dummy';
import { LocationKr } from '@constants/location';
import { PAGE_TITLE } from '@constants/pageTitle';
import { ParticipateButtonStatus } from '@constants/participateButton';
import { getCommonBadgeColor, getStatusBadgeColor } from '@utils/colors';

const ArticleDetail = () => {
  const {
    colors: { indigo, gray },
  } = useTheme();

  const [participantsModalOpen, setParticipantsModalOpen] = useState<boolean>(false);

  const {
    authorName,
    title,
    status,
    authorThumbnail,
    createdAt,
    category,
    location,
    contents,
    currentCapacity,
    maxCapacity,
    commentCount,
  } = dummyArticle;

  return (
    <PageLayout
      // TODO rightNode에 작성자 여부에 따라 메뉴버튼 렌더링 필요
      header={
        <Header
          leftNode={
            <DetailTitle title={PAGE_TITLE.ARTICLE.title} subTitle={PAGE_TITLE.ARTICLE.subTitle} />
          }
        />
      }
    >
      <ContenxtWrapper>
        <DetailWrapper>
          <ProfileWrapper>
            <Avatar radius="xl" size="lg" alt="avatar" src={authorThumbnail} />
            <ProfileTextWrapper>
              <Author>{authorName}</Author>
              <Time>{createdAt}</Time>
            </ProfileTextWrapper>
          </ProfileWrapper>
          <Title>{title}</Title>
          <TagWrapper>
            <ArticleTag
              color={getStatusBadgeColor(status)}
              content={ArticleStatusKr[status]}
              size="lg"
            />
            <ArticleTag
              color={getCommonBadgeColor(category.id)}
              content={CategoryKr[category.name]}
              size="lg"
            />
            <ArticleTag
              color={getCommonBadgeColor(location.id)}
              content={LocationKr[location.name]}
              size="lg"
            />
          </TagWrapper>
          <ParticipantWrapper>
            <StatusWrapper>
              <StatusText>모집 현황</StatusText>
              <CountText>
                {currentCapacity}명 / {maxCapacity}명
              </CountText>
            </StatusWrapper>
            <ParticipantButton onClick={() => setParticipantsModalOpen(true)}>
              <IconList width="16" height="16" color={gray[6]} />
              <ViewText>신청자 확인</ViewText>
            </ParticipantButton>
          </ParticipantWrapper>
          <Progress
            value={(currentCapacity / maxCapacity) * 100}
            size="lg"
            radius="lg"
            color={indigo[7]}
          />
          <TypographyStylesProvider>
            <ContentBox dangerouslySetInnerHTML={{ __html: contents }} />
          </TypographyStylesProvider>
          {/* TODO 모집상태와 유저 참가 상태에 따라 렌더링 */}
          <ParticipateButton status={ParticipateButtonStatus.LINK} chatRoomLink={'tetetetetet'} />
          <StatCounter variant="comment" count={commentCount} />
        </DetailWrapper>
        <Divider />
        <CommentWrapper>
          <div>댓글영역</div>
        </CommentWrapper>
      </ContenxtWrapper>
      {/* TODO participants API 요청 */}
      <ParticipantsModal
        participants={dummyParticipants}
        open={participantsModalOpen}
        onClose={() => setParticipantsModalOpen(false)}
      />
    </PageLayout>
  );
};

export default ArticleDetail;

const ContenxtWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const ProfileTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Author = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
`;

const Time = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[4]};
`;

const Title = styled.span`
  font-size: 2rem;
  font-weight: 800;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const ParticipantWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatusWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const StatusText = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[4]};
`;

const CountText = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
`;

const ParticipantButton = styled.button`
  display: flex;
  gap: 4px;
  padding: 0;
  height: 1.7rem;
  align-items: center;
  border: none;
  background-color: ${({ theme }) => theme.white};
  &:hover {
    cursor: pointer;
  }
`;

const ViewText = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[6]};
`;

const ContentBox = styled.div`
  width: 100%;
  min-height: 200px;
  padding: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[2]};
  border-radius: 8px;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  width: 100%;
  height: 0.05rem;
  background-color: ${({ theme }) => theme.colors.gray[4]};
`;
