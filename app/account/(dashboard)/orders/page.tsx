import { createClient } from '@/app/lib/supabase/server';
import { redirect } from 'next/navigation';
import OrdersList from './OrdersList';

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/account/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('email')
    .eq('user_id', user.id)
    .single();

  const email = profile?.email ?? user.email;
  if (!email) return <p className="text-gray-300">No email found.</p>;

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_email', email)
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-normal text-white mb-2" style={{ letterSpacing: '-0.03em' }}>Orders & Receipts</h1>
        <p className="text-red-300">Error loading orders. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-normal text-white mb-2" style={{ letterSpacing: '-0.03em' }}>Orders & Receipts</h1>
      <p className="text-gray-300 mb-8">View and download your order history.</p>

      <OrdersList orders={orders ?? []} />
    </div>
  );
}
