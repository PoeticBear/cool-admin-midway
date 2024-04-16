import { BaseService, CoolCommException } from '@cool-midway/core';
import { Inject, InjectClient, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Equal, In, Repository } from 'typeorm';
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager';
import * as _ from 'lodash';
import * as md5 from 'md5';
import { SoccerLeagueEntity } from '../entity/league';

@Provide()
export class SoccerLeagueService extends BaseService {
  @InjectEntityModel(SoccerLeagueEntity)
  soccerLeagueEntity: Repository<SoccerLeagueEntity>;

  @InjectClient(CachingFactory, 'default')
  midwayCache: MidwayCache;

  @Inject()
  ctx;

  /**
   * 新增
   * @param  param
   */

  async add(param) {
    const exist = await this.soccerLeagueEntity.findOneBy({
      country: param.country,
      league: param.league,
    });

    if (!_.isEmpty(exist)) {
      throw new CoolCommException('数据已存在');
    }

    await this.soccerLeagueEntity.save(param);

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
      await this.soccerLeagueEntity.delete({ id });
    }
  }

  async update(param) {
    await this.soccerLeagueEntity.save(param);
  }

  async info(id) {
    const seasonInfo = await this.soccerLeagueEntity.findOneBy({ id });
    return seasonInfo;
  }

  async list() {
    return this.soccerLeagueEntity.createQueryBuilder().getMany();
  }

  async page(query) {
    const { keyWord } = query;
    const sql = `
        SELECT
            *
        FROM
             soccer_league a
        WHERE 1 = 1
            ${this.setSql(keyWord, 'and (a.league LIKE ?)', [`%${keyWord}%`])}
        `;

    return await this.sqlRenderPage(sql, query);
  }
}
