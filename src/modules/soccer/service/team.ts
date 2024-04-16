import { BaseService, CoolCommException } from '@cool-midway/core';
import { Inject, InjectClient, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Equal, In, Repository } from 'typeorm';
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager';
import * as _ from 'lodash';
import * as md5 from 'md5';
import { SoccerTeamEntity } from '../entity/team';

@Provide()
export class SoccerTeamService extends BaseService {
  @InjectEntityModel(SoccerTeamEntity)
  soccerTeamEntity: Repository<SoccerTeamEntity>;

  @InjectClient(CachingFactory, 'default')
  midwayCache: MidwayCache;

  @Inject()
  ctx;

  /**
   * 新增
   * @param  param
   */

  async add(param) {
    const exist = await this.soccerTeamEntity.findOneBy({
      name: param.name,
      leagueId: param.leagueId,
    });

    if (!_.isEmpty(exist)) {
      throw new CoolCommException('数据已存在');
    }

    await this.soccerTeamEntity.save(param);

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
      await this.soccerTeamEntity.delete({ id });
    }
  }

  async update(param) {
    await this.soccerTeamEntity.save(param);
  }

  async info(id) {
    const info = await this.soccerTeamEntity.findOneBy({ id });
    return info;
  }

  async list() {
    return this.soccerTeamEntity.createQueryBuilder().getMany();
  }

  async page(query) {
    const { keyWord } = query;
    const sql = `
        SELECT
            *
        FROM
             soccer_team a
        WHERE 1 = 1
            ${this.setSql(keyWord, 'and (a.name LIKE ?)', [`%${keyWord}%`])}
        `;

    return await this.sqlRenderPage(sql, query);
  }
}
