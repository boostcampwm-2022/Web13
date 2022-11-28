import {
  GROUP_STATUS,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';
import { ApiProperty } from '@nestjs/swagger';
import { GroupCategoryResponse } from '@app/group-article/dto/get-cateogories-response.dto';
import { IGroupArticleSearchResult } from '@app/group-article/dto/group-article-search-result.interface';

export class GroupArticleSearchResult {
  @ApiProperty({ example: 1, description: '게시글 아이디' })
  id: number;

  @ApiProperty({ example: 'test001', description: '게시글 제목' })
  title: string;

  @ApiProperty({ example: 'test.png', description: '썸네일' })
  thumbnail: string;

  @ApiProperty({
    example: GROUP_STATUS.PROGRESS,
    description: '모집 상태',
  })
  status: GROUP_STATUS;

  @ApiProperty({ example: LOCATION.BUSAN, description: '모집 장소' })
  location: LOCATION;

  @ApiProperty({ type: GroupCategoryResponse })
  category: GroupCategoryResponse;

  @ApiProperty({ example: 10, description: '모집 최대 인원 수' })
  maxCapacity: number;

  @ApiProperty({ example: 3, description: '현재 신청자 수' })
  currentCapacity: number;

  @ApiProperty({ example: 0, description: '스크랩 수' })
  scrapCount: number;

  @ApiProperty({ example: 1, description: '댓글 수' })
  commentCount: number;

  @ApiProperty({
    example: '2022-11-27T16:19:51.706Z',
    description: '게시글 작성일',
  })
  createdAt: Date;

  static from(row: IGroupArticleSearchResult) {
    const res = new GroupArticleSearchResult();
    res.id = row.id;
    res.title = row.title;
    res.thumbnail = row.thumbnail;
    res.category = {
      id: row.groupCategoryId,
      name: row.groupCategoryName,
    };
    res.location = row.location;
    res.status = row.status;
    res.maxCapacity = row.maxCapacity;
    res.currentCapacity = row.currentCapacity;
    res.commentCount = row.commentCount;
    res.scrapCount = row.scrapCount;
    res.createdAt = row.createdAt;
    return res;
  }
}
