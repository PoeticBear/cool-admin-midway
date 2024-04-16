import { BaseService, CoolCommException } from '@cool-midway/core';
import { Inject, InjectClient, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Equal, In, Repository } from 'typeorm';
import { SoccerSeasonEntity } from '../entity/season';
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager';
import * as _ from 'lodash';
import * as md5 from 'md5';

@Provide()
export class SoccerSeasonService extends BaseService {
  @InjectEntityModel(SoccerSeasonEntity)
  soccerSeasonEntity: Repository<SoccerSeasonEntity>;

  @InjectClient(CachingFactory, 'default')
  midwayCache: MidwayCache;

  @Inject()
  ctx;

  /**
   * 新增
   * @param  param
   */

  async add(param) {
    const exist = await this.soccerSeasonEntity.findOneBy({
      season: param.season,
      league: param.league,
    });

    if (!_.isEmpty(exist)) {
      throw new CoolCommException('联赛和赛季同时存在');
    }

    await this.soccerSeasonEntity.save(param);

    return param.id;
  }

  async delete(ids) {
    let idArr;
    if (ids instanceof Array) {
      idArr = ids;
    } else {
      idArr = ids.split(',');
    }

    for (const id of idArr) {
      await this.soccerSeasonEntity.delete({ id });
    }
  }

  async update(param) {
    await this.soccerSeasonEntity.save(param);
  }

  async info(id) {
    const seasonInfo = await this.soccerSeasonEntity.findOneBy({ id });
    return seasonInfo;
  }

  async list() {
    return this.soccerSeasonEntity.createQueryBuilder().getMany();
  }

  async page(query) {
    const { keyWord } = query;
    const sql = `
        SELECT
            a.id,a.league,a.season,a.season_id,a.url,a.createTime,a.updateTime
        FROM
            soccer_season a
        WHERE 1 = 1
            ${this.setSql(keyWord, 'and (a.season LIKE ?)', [`%${keyWord}%`])}
        `;

    return await this.sqlRenderPage(sql, query);
  }
}
