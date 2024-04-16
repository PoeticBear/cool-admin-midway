import { BaseController, CoolController } from '@cool-midway/core';
import { SoccerPlayerEntity } from '../../entity/player';
import { SoccerPlayerService } from '../../service/player';
import { Inject, Post } from '@midwayjs/core';
import { Body, Provide } from '@midwayjs/decorator';

@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: SoccerPlayerEntity,
  service: SoccerPlayerService,
})
export class SoccerPlayerController extends BaseController {
  @Inject()
  soccerPlayerService: SoccerPlayerService;

  @Post('/addPlayer', { summary: '新增球员' })
  async addPlayer(@Body() body) {
    await this.soccerPlayerService.add(body);
    return this.ok();
  }
}
