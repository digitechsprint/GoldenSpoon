-- Add price_half column to menu_items for Half/Full pricing
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS price_half NUMERIC(10,2);

-- Rename existing price column to price_full for clarity (optional alias)
-- We keep `price` as the Full price and add `price_half` for Half price
