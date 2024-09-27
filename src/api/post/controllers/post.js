'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const populate = ctx.query.populate === '*' ? true : ctx.query.populate;

    const post = await strapi.db.query('api::post.post').findOne({
      where: { slug },
      populate: populate || {},
    });

    if (!post) {
      return ctx.throw(404, 'Post not found');
    }

    return post;
  },
}));
