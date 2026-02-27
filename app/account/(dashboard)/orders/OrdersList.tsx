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
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-slate-600 mb-4">You haven&apos;t placed any orders yet.</p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-[#fa4a23] text-white font-semibold rounded-lg hover:bg-[#e03d1a] transition"
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
          className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-900">{order.course_name}</h3>
              <p className="text-sm text-slate-500 mt-1">
                {order.schedule_date && `Class: ${order.schedule_date}`}
                {!order.schedule_date && new Date(order.created_at).toLocaleDateString('en-US', { dateStyle: 'medium' })}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                ${order.amount.toFixed(2)} {order.currency.toUpperCase()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.payment_status === 'succeeded'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {order.payment_status}
              </span>
              <a
                href={`/api/receipt?pi=${order.payment_intent_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#fa4a23] hover:underline"
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
