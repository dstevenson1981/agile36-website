/* SASM465 promo: $465 per seat cap for Advanced Scrum Master (advanced-scrum-master) checkout.
   Pricing is enforced in application code — validate-promo-code + create-payment-intent.
   Do not insert into promo_codes; a DB row would not apply the per-seat cap correctly. */

-- Optional: remove a conflicting generic row if one was added manually
DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = 'SASM465';
