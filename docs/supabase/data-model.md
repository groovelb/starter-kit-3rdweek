# Lumenstate Data Model

## Overview

Supabase MCP를 통한 자동 DB 설정을 위한 데이터 모델 문서입니다.
이 문서는 테이블 스키마, 관계, RLS 정책, 초기 데이터를 정의합니다.

---

## 1. Entity Relationships

### Tables Overview

| Table | Description | Primary Key |
|-------|-------------|-------------|
| product_types | 제품 유형 정의 | id (UUID) |
| product_options | 제품 옵션 (glass_finish, hardware, height) | id (UUID) |
| products | 제품 정보 | id (UUID) |
| order_statuses | 주문 상태 정의 | id (UUID) |
| orders | 주문 정보 | id (UUID) |
| order_items | 주문 항목 | id (UUID) |
| admin_profiles | 어드민 프로필 | id (UUID, FK to auth.users) |

### Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| products.type_id -> product_types.id | N:1 | 제품은 하나의 타입을 가짐 |
| orders.status_id -> order_statuses.id | N:1 | 주문은 하나의 상태를 가짐 |
| order_items.order_id -> orders.id | N:1 | 주문 항목은 하나의 주문에 속함 |
| order_items.product_id -> products.id | N:1 | 주문 항목은 하나의 제품을 참조 |
| admin_profiles.id -> auth.users.id | 1:1 | 어드민 프로필은 Supabase Auth 사용자와 연결 |

---

## 2. Table Definitions

### 2.1 product_types

제품 유형 (기존 PRODUCT_TYPES enum 대체)

```sql
CREATE TABLE product_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL UNIQUE,           -- 'ceiling', 'stand', 'wall', 'desk'
  label TEXT NOT NULL,                   -- 'Ceiling', 'Stand', 'Wall', 'Desk'
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_product_types_value ON product_types(value);
CREATE INDEX idx_product_types_sort ON product_types(sort_order);
```

**Initial Data:**
```sql
INSERT INTO product_types (value, label, sort_order) VALUES
  ('ceiling', 'Ceiling', 1),
  ('stand', 'Stand', 2),
  ('wall', 'Wall', 3),
  ('desk', 'Desk', 4);
```

---

### 2.2 product_options

제품 옵션 (기존 PRODUCT_OPTIONS 대체)

```sql
CREATE TABLE product_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,                -- 'glass_finish', 'hardware', 'height'
  value TEXT NOT NULL,                   -- 'clear', 'patina-brass', '36-48'
  label TEXT NOT NULL,                   -- 'Clear', 'Patina Brass', '36" - 48"'
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(category, value)
);

-- Indexes
CREATE INDEX idx_product_options_category ON product_options(category);
CREATE INDEX idx_product_options_active ON product_options(is_active);
CREATE INDEX idx_product_options_sort ON product_options(category, sort_order);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_product_options_updated_at
  BEFORE UPDATE ON product_options
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Initial Data - Glass Finish:**
```sql
INSERT INTO product_options (category, value, label, sort_order) VALUES
  ('glass_finish', 'clear', 'Clear', 1),
  ('glass_finish', 'frosted', 'Frosted', 2),
  ('glass_finish', 'opaline', 'Opaline', 3),
  ('glass_finish', 'amber', 'Amber', 4),
  ('glass_finish', 'smoke', 'Smoke', 5);
```

**Initial Data - Hardware:**
```sql
INSERT INTO product_options (category, value, label, sort_order) VALUES
  ('hardware', 'patina-brass', 'Patina Brass', 1),
  ('hardware', 'polished-brass', 'Polished Brass', 2),
  ('hardware', 'brushed-nickel', 'Brushed Nickel', 3),
  ('hardware', 'matte-black', 'Matte Black', 4),
  ('hardware', 'chrome', 'Chrome', 5);
```

**Initial Data - Height:**
```sql
INSERT INTO product_options (category, value, label, sort_order) VALUES
  ('height', '36-48', '36" - 48"', 1),
  ('height', '49-60', '49" - 60"', 2),
  ('height', '61-72', '61" - 72"', 3),
  ('height', '73-84', '73" - 84"', 4),
  ('height', '85-96', '85" - 96"', 5);
```

---

### 2.3 products

제품 정보 (기존 products.js 대체)

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic Info
  title TEXT NOT NULL,
  description TEXT,
  type_id UUID REFERENCES product_types(id) ON DELETE SET NULL,

  -- Technical Specs
  lux INTEGER NOT NULL DEFAULT 0,
  kelvin INTEGER NOT NULL DEFAULT 0,
  price DECIMAL(10, 2) DEFAULT 0,

  -- Media URLs (Supabase Storage)
  day_image_url TEXT,
  night_image_url TEXT,
  video_url TEXT,

  -- Status
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_products_type ON products(type_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_sort ON products(sort_order);
CREATE INDEX idx_products_title ON products USING gin(to_tsvector('english', title));

-- Updated_at trigger
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Field Mapping from products.js:**

| Old Field | New Field | Notes |
|-----------|-----------|-------|
| id (number) | id (UUID) | Auto-generated |
| title | title | Same |
| description | description | Same |
| type (string) | type_id (UUID) | FK to product_types |
| lux | lux | Same |
| kelvin | kelvin | Same |
| - | price | New field |
| images[0] | day_image_url | Storage URL |
| images[1] | night_image_url | Storage URL |
| video | video_url | Storage URL |

---

### 2.4 order_statuses

주문 상태 정의

```sql
CREATE TABLE order_statuses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL UNIQUE,            -- 'pending', 'confirmed', etc.
  label TEXT NOT NULL,                   -- 'Pending', 'Confirmed', etc.
  label_ko TEXT NOT NULL,                -- '주문 대기', '주문 확인', etc.
  color TEXT NOT NULL,                   -- MUI color: 'warning', 'info', etc.
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index
CREATE INDEX idx_order_statuses_value ON order_statuses(value);
CREATE INDEX idx_order_statuses_sort ON order_statuses(sort_order);
```

**Initial Data:**
```sql
INSERT INTO order_statuses (value, label, label_ko, color, sort_order) VALUES
  ('pending', 'Pending', '주문 대기', 'warning', 1),
  ('confirmed', 'Confirmed', '주문 확인', 'info', 2),
  ('shipped', 'Shipped', '배송 중', 'primary', 3),
  ('delivered', 'Delivered', '배송 완료', 'success', 4),
  ('cancelled', 'Cancelled', '주문 취소', 'error', 5);
```

---

### 2.5 orders

주문 정보 (CheckoutSection 데이터 기반)

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Order Identifier
  order_number TEXT NOT NULL UNIQUE,     -- 'LUM-YYYYMMDD-NNN'
  status_id UUID REFERENCES order_statuses(id) ON DELETE SET NULL,

  -- Contact Info (from ContactForm)
  email TEXT NOT NULL,
  newsletter BOOLEAN DEFAULT false,

  -- Shipping Info (from ShippingForm)
  country TEXT NOT NULL DEFAULT 'KR',
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company TEXT,
  address TEXT NOT NULL,
  apartment TEXT,
  city TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  phone TEXT,

  -- Order Totals
  subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  discount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'KRW',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  confirmed_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_orders_status ON orders(status_id);
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- Updated_at trigger
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Order Number Generation Function:**
```sql
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
DECLARE
  today_date TEXT;
  sequence_num INTEGER;
BEGIN
  today_date := to_char(now(), 'YYYYMMDD');

  SELECT COALESCE(MAX(
    CAST(SUBSTRING(order_number FROM 'LUM-' || today_date || '-(\d+)') AS INTEGER)
  ), 0) + 1
  INTO sequence_num
  FROM orders
  WHERE order_number LIKE 'LUM-' || today_date || '-%';

  NEW.order_number := 'LUM-' || today_date || '-' || LPAD(sequence_num::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_order_number_trigger
  BEFORE INSERT ON orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL)
  EXECUTE FUNCTION generate_order_number();
```

---

### 2.6 order_items

주문 항목 (CartItem 구조 기반)

```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- References
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,

  -- Product Snapshot (주문 시점의 제품 정보 보존)
  product_title TEXT NOT NULL,
  product_lux INTEGER,
  product_kelvin INTEGER,
  product_image_url TEXT,

  -- Selected Options
  options JSONB DEFAULT '{}',            -- { "glassFinish": "opaline", "hardware": "brass", "height": "61-72" }

  -- Quantity & Price
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  line_total DECIMAL(10, 2) NOT NULL DEFAULT 0,

  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- GIN index for JSONB options querying
CREATE INDEX idx_order_items_options ON order_items USING gin(options);
```

---

### 2.7 admin_profiles

어드민 프로필 (Supabase Auth 연동)

```sql
CREATE TABLE admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  role TEXT DEFAULT 'admin',             -- 'admin', 'editor', 'viewer'
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index
CREATE INDEX idx_admin_profiles_role ON admin_profiles(role);

-- Updated_at trigger
CREATE TRIGGER update_admin_profiles_updated_at
  BEFORE UPDATE ON admin_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## 3. Row Level Security (RLS)

### 3.1 Enable RLS

```sql
ALTER TABLE product_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
```

### 3.2 Helper Functions

```sql
-- Check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is admin (strict)
CREATE OR REPLACE FUNCTION is_admin_strict()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3.3 Policies

**product_types:**
```sql
-- Public can read
CREATE POLICY "product_types_select_public" ON product_types
  FOR SELECT USING (true);

-- Admins can manage
CREATE POLICY "product_types_all_admin" ON product_types
  FOR ALL USING (is_admin_strict());
```

**product_options:**
```sql
-- Public can read active options
CREATE POLICY "product_options_select_public" ON product_options
  FOR SELECT USING (is_active = true);

-- Admins can manage
CREATE POLICY "product_options_all_admin" ON product_options
  FOR ALL USING (is_admin_strict());
```

**products:**
```sql
-- Public can read active products
CREATE POLICY "products_select_public" ON products
  FOR SELECT USING (is_active = true);

-- Admins can manage
CREATE POLICY "products_all_admin" ON products
  FOR ALL USING (is_admin());
```

**order_statuses:**
```sql
-- Public can read (for display in checkout)
CREATE POLICY "order_statuses_select_public" ON order_statuses
  FOR SELECT USING (true);

-- Admins can manage
CREATE POLICY "order_statuses_all_admin" ON order_statuses
  FOR ALL USING (is_admin_strict());
```

**orders:**
```sql
-- Anyone can create (checkout)
CREATE POLICY "orders_insert_public" ON orders
  FOR INSERT WITH CHECK (true);

-- Admins can read all
CREATE POLICY "orders_select_admin" ON orders
  FOR SELECT USING (is_admin());

-- Admins can update
CREATE POLICY "orders_update_admin" ON orders
  FOR UPDATE USING (is_admin());
```

**order_items:**
```sql
-- Anyone can create (checkout)
CREATE POLICY "order_items_insert_public" ON order_items
  FOR INSERT WITH CHECK (true);

-- Admins can read all
CREATE POLICY "order_items_select_admin" ON order_items
  FOR SELECT USING (is_admin());
```

**admin_profiles:**
```sql
-- Admins can read their own profile
CREATE POLICY "admin_profiles_select_own" ON admin_profiles
  FOR SELECT USING (id = auth.uid());

-- Only admin can manage
CREATE POLICY "admin_profiles_all_admin" ON admin_profiles
  FOR ALL USING (is_admin_strict());
```

---

## 4. Storage Buckets

### 4.1 product-images

```sql
-- Create bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- Storage policies
CREATE POLICY "product_images_select_public"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "product_images_insert_admin"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images'
  AND is_admin()
);

CREATE POLICY "product_images_update_admin"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images' AND is_admin());

CREATE POLICY "product_images_delete_admin"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images' AND is_admin());
```

**File Structure:**

| Path | Description |
|------|-------------|
| product-images/day/{product_id}.png | 낮 이미지 |
| product-images/night/{product_id}.png | 밤 이미지 |

### 4.2 product-videos

```sql
-- Create bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-videos', 'product-videos', true);

-- Storage policies (same pattern as images)
CREATE POLICY "product_videos_select_public"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-videos');

CREATE POLICY "product_videos_insert_admin"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-videos'
  AND is_admin()
);

CREATE POLICY "product_videos_update_admin"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-videos' AND is_admin());

CREATE POLICY "product_videos_delete_admin"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-videos' AND is_admin());
```

**File Structure:**

| Path | Description |
|------|-------------|
| product-videos/{product_id}.mp4 | 제품 비디오 |

---

## 5. Views

### 5.1 products_with_type

```sql
CREATE VIEW products_with_type AS
SELECT
  p.*,
  pt.value AS type_value,
  pt.label AS type_label
FROM products p
LEFT JOIN product_types pt ON p.type_id = pt.id;
```

### 5.2 orders_with_status

```sql
CREATE VIEW orders_with_status AS
SELECT
  o.*,
  os.value AS status_value,
  os.label AS status_label,
  os.label_ko AS status_label_ko,
  os.color AS status_color,
  (
    SELECT COUNT(*)
    FROM order_items oi
    WHERE oi.order_id = o.id
  ) AS items_count
FROM orders o
LEFT JOIN order_statuses os ON o.status_id = os.id;
```

---

## 6. Migration Script

기존 `products.js` 데이터를 Supabase로 마이그레이션하는 스크립트:

```javascript
// scripts/migrate-products.js
// 실행: node scripts/migrate-products.js

import { products, PRODUCT_TYPES, PRODUCT_OPTIONS } from '../src/data/products.js';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function migrate() {
  // 1. Get type IDs
  const { data: types } = await supabase
    .from('product_types')
    .select('id, value');

  const typeMap = Object.fromEntries(types.map(t => [t.value, t.id]));

  // 2. Insert products
  for (const product of products) {
    const { id, title, description, type, lux, kelvin, images, video } = product;

    // Upload images to storage
    const dayImageUrl = await uploadImage(images[0], `day/${id}.png`);
    const nightImageUrl = await uploadImage(images[1], `night/${id}.png`);
    const videoUrl = video ? await uploadVideo(video, `${id}.mp4`) : null;

    // Insert product
    await supabase.from('products').insert({
      title,
      description,
      type_id: typeMap[type],
      lux,
      kelvin,
      price: 1290, // Default price from App.jsx
      day_image_url: dayImageUrl,
      night_image_url: nightImageUrl,
      video_url: videoUrl,
      is_active: true,
      sort_order: id
    });
  }

  console.log('Migration complete!');
}

migrate();
```

---

## 7. TypeScript Types (Reference)

```typescript
// types/database.ts

interface ProductType {
  id: string;
  value: 'ceiling' | 'stand' | 'wall' | 'desk';
  label: string;
  sort_order: number;
  created_at: string;
}

interface ProductOption {
  id: string;
  category: 'glass_finish' | 'hardware' | 'height';
  value: string;
  label: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: string;
  title: string;
  description: string | null;
  type_id: string | null;
  lux: number;
  kelvin: number;
  price: number;
  day_image_url: string | null;
  night_image_url: string | null;
  video_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface OrderStatus {
  id: string;
  value: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  label: string;
  label_ko: string;
  color: 'warning' | 'info' | 'primary' | 'success' | 'error';
  sort_order: number;
}

interface Order {
  id: string;
  order_number: string;
  status_id: string | null;
  email: string;
  newsletter: boolean;
  country: string;
  first_name: string;
  last_name: string;
  company: string | null;
  address: string;
  apartment: string | null;
  city: string;
  zip_code: string;
  phone: string | null;
  subtotal: number;
  shipping_cost: number;
  discount: number;
  total: number;
  currency: string;
  created_at: string;
  updated_at: string;
  confirmed_at: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
}

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_title: string;
  product_lux: number | null;
  product_kelvin: number | null;
  product_image_url: string | null;
  options: {
    glassFinish?: string;
    hardware?: string;
    height?: string;
  };
  quantity: number;
  unit_price: number;
  line_total: number;
  created_at: string;
}

interface AdminProfile {
  id: string;
  display_name: string | null;
  role: 'admin' | 'editor' | 'viewer';
  created_at: string;
  updated_at: string;
}
```

---

## 8. API Endpoints Summary

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /products | 제품 목록 | Public |
| GET | /products/:id | 제품 상세 | Public |
| POST | /products | 제품 생성 | Admin |
| PATCH | /products/:id | 제품 수정 | Admin |
| DELETE | /products/:id | 제품 삭제 | Admin |
| GET | /orders | 주문 목록 | Admin |
| GET | /orders/:id | 주문 상세 | Admin |
| POST | /orders | 주문 생성 | Public |
| PATCH | /orders/:id/status | 상태 변경 | Admin |
| GET | /product-options | 옵션 목록 | Public |
| POST | /product-options | 옵션 생성 | Admin |
| PATCH | /product-options/:id | 옵션 수정 | Admin |
| DELETE | /product-options/:id | 옵션 삭제 | Admin |
