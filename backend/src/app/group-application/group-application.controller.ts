import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { GroupApplicationService } from '@app/group-application/group-application.service';
import { AttendGroupRequest } from '@app/group-application/dto/attend-group-request.dto';
import { ApiSuccessResponse } from '@src/common/decorator/api-success-resposne.decorator';
import { AttendGroupResponse } from '@app/group-application/dto/attend-group-response.dto';
import { CurrentUser } from '@src/common/decorator/current-user.decorator';
import { User } from '@app/user/entity/user.entity';
import { JwtAuth } from '@src/common/decorator/jwt-auth.decorator';
import { ResponseEntity } from '@src/common/response-entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '@src/common/decorator/api-error-response.decorator';
import { DuplicateApplicationException } from '@src/app/group-application/exception/duplicate-application.exception';
import { GroupNotFoundException } from '@app/group-application/exception/group-not-found.exception';
import { CannotApplicateException } from '@src/app/group-application/exception/cannot-applicate.exception';

@Controller('group-applications')
@JwtAuth()
@ApiTags('Group-Application')
export class GroupApplicationController {
  constructor(
    private readonly groupApplicationService: GroupApplicationService,
  ) {}

  @Post('/')
  @ApiSuccessResponse(HttpStatus.CREATED, AttendGroupResponse)
  @ApiErrorResponse(
    DuplicateApplicationException,
    CannotApplicateException,
    GroupNotFoundException,
  )
  async attendGroup(
    @CurrentUser() user: User,
    @Body() attendGroupRequest: AttendGroupRequest,
  ) {
    const groupId = attendGroupRequest.groupId;
    const groupApplication = await this.groupApplicationService.attendGroup(
      user.id,
      groupId,
    );
    const data = AttendGroupResponse.from(groupApplication.id);
    return ResponseEntity.CREATED_WITH_DATA(data);
  }
}