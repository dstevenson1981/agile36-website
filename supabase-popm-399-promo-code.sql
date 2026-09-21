/* POPM / POPM399: $399 per seat for SAFe POPM (product-owner-manager).
   Not a "$399 off" code — it caps the seat at $399.
   Pricing is enforced in application code — validate-promo-code + create-payment-intent.
   Remove any leftover promo_codes rows so these are not confused with DB-driven codes. */

DELETE FROM promo_codes
WHERE UPPER(TRIM(code)) IN ('POPM', 'POPM399', '399OFF');
