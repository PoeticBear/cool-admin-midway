import { BaseController, CoolController } from '@cool-midway/core';
import { SoccerTeamEntity } from '../../entity/team';
import { SoccerTeamService } from '../../service/team';
import { Inject, Post } from '@midwayjs/core';
import { Body, Provide } from '@midwayjs/decorator';

@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: SoccerTeamEntity,
  service: SoccerTeamService,
})
export class SoccerTeamController extends BaseController {
  @Inject()
  soccerTeamService: SoccerTeamService;

  @Post('/addTeam', { summary: ' 新增球队' })
  async addLeague(@Body() body) {
    await this.soccerTeamService.add(body);
    return this.ok();
  }
}
