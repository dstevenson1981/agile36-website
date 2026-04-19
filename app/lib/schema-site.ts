/** Single canonical @id for Agile36 org JSON-LD (root layout defines the entity). */
export const SCHEMA_ORGANIZATION_ID = "https://www.agile36.com/#organization" as const;

/** WebSite entity @id (paired with EducationalOrganization in root JSON-LD). */
export const SCHEMA_WEBSITE_ID = "https://www.agile36.com/#website" as const;

/** Public brand logo (`public/logo.png`). */
export const SCHEMA_ORGANIZATION_LOGO_URL = "https://www.agile36.com/logo.png" as const;

/** Intrinsic dimensions of `public/logo.png` (for JSON-LD ImageObject). */
export const SCHEMA_ORGANIZATION_LOGO_WIDTH = 1280;
export const SCHEMA_ORGANIZATION_LOGO_HEIGHT = 853;

/** Default Open Graph / article image (place file at `public/og/agile36-default.png`). */
export const SCHEMA_DEFAULT_OG_IMAGE_URL =
  "https://www.agile36.com/og/agile36-default.png" as const;

export const SCHEMA_DEFAULT_OG_IMAGE_WIDTH = 1200;
export const SCHEMA_DEFAULT_OG_IMAGE_HEIGHT = 630;

export const SCALED_AGILE_TRAINING_FEEDBACK_URL =
  "https://training.scaledagile.com/?sort=feedbackScore&page=1&limit=25" as const;
