'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async init() {
    const { redis } = this.app;
    redis.set('kill_num', 20);
    redis.del('kill_users');
    this.ctx.body = 'ok';
  }

  async getStatus() {
    const { redis } = this.app;
    const num = await redis.get('kill_num');
    const users = await redis.lrange('kill_users',0,20);
    this.ctx.body = {
      num,
      users,
    };
  }

  async kill(ctx) {
    const num = await this.app.redis.get('kill_num');
    if (num > 0) {
      let res;
      res = await this.ctx.service.home.kill(Date.now());
      ctx.body = res ? '秒杀成功' : '秒杀失败';
    } else {
      ctx.body = '没有库存';
    }
  }
}

module.exports = HomeController;
