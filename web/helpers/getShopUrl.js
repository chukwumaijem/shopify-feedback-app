import { Shopify } from '@shopify/shopify-api';

export async function getShopUrlFromSession(req, res) {
  const session = await Shopify.Utils.loadCurrentSession(req, res, false);
  return session.shop;
}
