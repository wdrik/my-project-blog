'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const post = await strapi.db.query('api::post.post').findOne({
      where: { slug },
    });

    if (!post) {
      return ctx.throw(404, 'Post não encontrado');
    }

    return post;
  },
}));
