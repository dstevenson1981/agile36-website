'use client';

type Order = {
  id: string;
  course_name: string;
  course_slug: string;
  amount: number;
  currency: string;
  schedule_date: string;
  payment_status: string;
  created_at: string;
  payment_intent_id?: string;
};

export default function OrdersList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-12 text-center shadow-sm">
        <p className="text-[#64748b] mb-4">You haven&apos;t placed any orders yet.</p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-[#1f2c4a] text-white font-medium rounded-lg hover:bg-[#16243f] transition"
        >
          Browse courses
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-6 shadow-sm hover:border-[#1f2c4a]/20 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-medium text-[#1f2c4a]">{order.course_name}</h3>
              <p className="text-sm text-[#64748b] mt-1">
                {order.schedule_date && `Class: ${order.schedule_date}`}
                {!order.schedule_date && new Date(order.created_at).toLocaleDateString('en-US', { dateStyle: 'medium' })}
              </p>
              <p className="text-sm text-[#475569] mt-1">
                ${order.amount.toFixed(2)} {order.currency.toUpperCase()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.payment_status === 'succeeded'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20'
                }`}
              >
                {order.payment_status}
              </span>
              <a
                href={`/api/receipt?pi=${order.payment_intent_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#d97706] hover:underline"
              >
                Receipt →
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
