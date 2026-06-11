import { createClient } from '@/app/lib/supabase/server';
import { redirect } from 'next/navigation';
import ProfileForm from './ProfileForm';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/account/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return (
    <div>
      <h1 className="text-2xl font-normal text-white mb-2" style={{ letterSpacing: '-0.03em' }}>My Profile</h1>
      <p className="text-gray-300 mb-8">Update your account information.</p>

      <ProfileForm
        userId={user.id}
        initialData={{
          name: profile?.name ?? user.user_metadata?.name ?? '',
          email: profile?.email ?? user.email ?? '',
          phone: profile?.phone ?? '',
          company: profile?.company ?? '',
        }}
      />
    </div>
  );
}
