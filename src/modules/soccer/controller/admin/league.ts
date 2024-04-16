import { BaseController, CoolController } from '@cool-midway/core';
import { SoccerLeagueEntity } from '../../entity/league';
import { SoccerLeagueService } from '../../service/league';
import { Inject, Post } from '@midwayjs/core';
import { Body, Provide } from '@midwayjs/decorator';

@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: SoccerLeagueEntity,
  service: SoccerLeagueService,
})
export class SoccerLeagueController extends BaseController {
  @Inject()
  soccerLeagueService: SoccerLeagueService;

  @Post('/addLeague', { summary: '新增联赛' })
  async addLeague(@Body() body) {
    await this.soccerLeagueService.add(body);
    return this.ok();
  }
}
