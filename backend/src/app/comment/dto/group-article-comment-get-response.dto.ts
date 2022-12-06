import { ApiProperty } from '@nestjs/swagger';
import { CommentResponse } from './comment-response.dto';
import { PageResult } from '@src/common/util/page-result';

export class GroupArticleCommentGetResponse extends PageResult<CommentResponse> {
  @ApiProperty({ type: CommentResponse, isArray: true })
  get data() {
    return this._data;
  }
}
