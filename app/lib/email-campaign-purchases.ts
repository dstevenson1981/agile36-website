export type CampaignPurchase = {
  campaign_id: number;
  campaign_name: string;
  order_id: string;
  customer_email: string;
  customer_name: string | null;
  first_name: string | null;
  last_name: string | null;
  course_name: string;
  course_slug: string;
  amount: number;
  purchased_at: string;
  sent_at: string | null;
  opened: boolean;
  clicked: boolean;
  purchased_after_send: boolean;
};

export type CampaignPurchaseStats = {
  buyers_on_list: number;
  purchases_after_send: number;
  revenue_after_send: number;
  revenue_on_list: number;
};

export function summarizeCampaignPurchases(rows: CampaignPurchase[]): CampaignPurchaseStats {
  const after = rows.filter((row) => row.purchased_after_send);
  const uniqueBuyers = new Set(rows.map((row) => row.customer_email.toLowerCase()));
  const uniqueAfter = new Set(after.map((row) => row.customer_email.toLowerCase()));

  return {
    buyers_on_list: uniqueBuyers.size,
    purchases_after_send: uniqueAfter.size,
    revenue_after_send: after.reduce((sum, row) => sum + Number(row.amount || 0), 0),
    revenue_on_list: rows.reduce((sum, row) => sum + Number(row.amount || 0), 0),
  };
}

export function groupPurchaseStatsByCampaign(
  rows: CampaignPurchase[]
): Record<number, CampaignPurchaseStats> {
  const byCampaign = new Map<number, CampaignPurchase[]>();
  for (const row of rows) {
    const list = byCampaign.get(row.campaign_id) ?? [];
    list.push(row);
    byCampaign.set(row.campaign_id, list);
  }

  const stats: Record<number, CampaignPurchaseStats> = {};
  for (const [campaignId, list] of byCampaign) {
    stats[campaignId] = summarizeCampaignPurchases(list);
  }
  return stats;
}
