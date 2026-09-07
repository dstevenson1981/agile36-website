update public.promo_codes
set
  expires_at = '2026-09-08T00:00:00-04:00',
  description = 'One-day Labor Day 2026 sale — $100 off, ends tonight Sep 7'
where upper(code) = '100OFF';
