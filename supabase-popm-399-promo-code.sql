/* POPM promo: $399 per seat cap for SAFe POPM (product-owner-manager) checkout.
   Pricing is enforced in application code — validate-promo-code + create-payment-intent.
   Remove any legacy promo_codes row named POPM so it is not confused with DB-driven codes. */

DELETE FROM promo_codes WHERE UPPER(TRIM(code)) = 'POPM';
