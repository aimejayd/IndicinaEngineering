const {URLS} = require('../../src/models');

async function createMerchant() {
	await URLS.create({
		shopName: 'skipifydev.mybigcommerce.com',
		storeHash: 'igcmam0pwo',
		accessToken: 'sal5lddymd2u18cpu9x4s2scro7d68p',
	});
}

async function findMerchant() {
	return URLS.findOne({shopName: 'skipifydev.mybigcommerce.com'});
}

async function deleteMerchant() {
	await URLS.deleteOne({shopName: 'skipifydev.mybigcommerce.com'});
}

module.exports = {createMerchant, findMerchant, deleteMerchant};
