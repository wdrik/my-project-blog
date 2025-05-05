'use strict';

/**
 * raffle-participant service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::raffle-participant.raffle-participant');
