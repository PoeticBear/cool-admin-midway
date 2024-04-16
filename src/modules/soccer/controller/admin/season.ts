import { BaseController, CoolController } from '@cool-midway/core';
import { SoccerSeasonEntity } from '../../entity/season';
import { SoccerSeasonService } from '../../service/season';
import { Inject, Post } from '@midwayjs/core';
import { Body, Provide } from '@midwayjs/decorator';

@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: SoccerSeasonEntity,
  service: SoccerSeasonService,
})
export class SoccerSeasonController extends BaseController {
  @Inject()
  soccerSeasonService: SoccerSeasonService;

  @Post('/addSeason', { summary: '新增赛季' })
  async addSeason(@Body() body) {
    await this.soccerSeasonService.add(body);
    return this.ok();
  }
}
