export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          line_total: number
          options: Json | null
          order_id: string
          product_id: string | null
          product_image_url: string | null
          product_kelvin: number | null
          product_lux: number | null
          product_title: string
          quantity: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          line_total?: number
          options?: Json | null
          order_id: string
          product_id?: string | null
          product_image_url?: string | null
          product_kelvin?: number | null
          product_lux?: number | null
          product_title: string
          quantity?: number
          unit_price?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          line_total?: number
          options?: Json | null
          order_id?: string
          product_id?: string | null
          product_image_url?: string | null
          product_kelvin?: number | null
          product_lux?: number | null
          product_title?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders_with_status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products_with_type"
            referencedColumns: ["id"]
          },
        ]
      }
      order_statuses: {
        Row: {
          color: string
          created_at: string | null
          id: string
          label: string
          label_ko: string
          sort_order: number | null
          value: string
        }
        Insert: {
          color: string
          created_at?: string | null
          id?: string
          label: string
          label_ko: string
          sort_order?: number | null
          value: string
        }
        Update: {
          color?: string
          created_at?: string | null
          id?: string
          label?: string
          label_ko?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          address: string
          apartment: string | null
          cancelled_at: string | null
          city: string
          company: string | null
          confirmed_at: string | null
          country: string
          created_at: string | null
          currency: string | null
          delivered_at: string | null
          discount: number | null
          email: string
          first_name: string
          id: string
          last_name: string
          newsletter: boolean | null
          order_number: string
          phone: string | null
          shipped_at: string | null
          shipping_cost: number | null
          status_id: string | null
          subtotal: number
          total: number
          updated_at: string | null
          zip_code: string
        }
        Insert: {
          address: string
          apartment?: string | null
          cancelled_at?: string | null
          city: string
          company?: string | null
          confirmed_at?: string | null
          country?: string
          created_at?: string | null
          currency?: string | null
          delivered_at?: string | null
          discount?: number | null
          email: string
          first_name: string
          id?: string
          last_name: string
          newsletter?: boolean | null
          order_number: string
          phone?: string | null
          shipped_at?: string | null
          shipping_cost?: number | null
          status_id?: string | null
          subtotal?: number
          total?: number
          updated_at?: string | null
          zip_code: string
        }
        Update: {
          address?: string
          apartment?: string | null
          cancelled_at?: string | null
          city?: string
          company?: string | null
          confirmed_at?: string | null
          country?: string
          created_at?: string | null
          currency?: string | null
          delivered_at?: string | null
          discount?: number | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          newsletter?: boolean | null
          order_number?: string
          phone?: string | null
          shipped_at?: string | null
          shipping_cost?: number | null
          status_id?: string | null
          subtotal?: number
          total?: number
          updated_at?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "order_statuses"
            referencedColumns: ["id"]
          },
        ]
      }
      product_options: {
        Row: {
          category: string
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          updated_at: string | null
          value: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          updated_at?: string | null
          value: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      product_types: {
        Row: {
          created_at: string | null
          id: string
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string | null
          day_image_url: string | null
          description: string | null
          id: string
          is_active: boolean | null
          kelvin: number
          lux: number
          night_image_url: string | null
          price: number | null
          sort_order: number | null
          title: string
          type_id: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          day_image_url?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          kelvin?: number
          lux?: number
          night_image_url?: string | null
          price?: number | null
          sort_order?: number | null
          title: string
          type_id?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          day_image_url?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          kelvin?: number
          lux?: number
          night_image_url?: string | null
          price?: number | null
          sort_order?: number | null
          title?: string
          type_id?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "product_types"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      orders_with_status: {
        Row: {
          address: string | null
          apartment: string | null
          cancelled_at: string | null
          city: string | null
          company: string | null
          confirmed_at: string | null
          country: string | null
          created_at: string | null
          currency: string | null
          delivered_at: string | null
          discount: number | null
          email: string | null
          first_name: string | null
          id: string | null
          items_count: number | null
          last_name: string | null
          newsletter: boolean | null
          order_number: string | null
          phone: string | null
          shipped_at: string | null
          shipping_cost: number | null
          status_color: string | null
          status_id: string | null
          status_label: string | null
          status_label_ko: string | null
          status_value: string | null
          subtotal: number | null
          total: number | null
          updated_at: string | null
          zip_code: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "order_statuses"
            referencedColumns: ["id"]
          },
        ]
      }
      products_with_type: {
        Row: {
          created_at: string | null
          day_image_url: string | null
          description: string | null
          id: string | null
          is_active: boolean | null
          kelvin: number | null
          lux: number | null
          night_image_url: string | null
          price: number | null
          sort_order: number | null
          title: string | null
          type_id: string | null
          type_label: string | null
          type_value: string | null
          updated_at: string | null
          video_url: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "product_types"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean }
      is_admin_strict: { Args: Record<string, never>; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Views<T extends keyof Database['public']['Views']> = Database['public']['Views'][T]['Row']

// Convenience type aliases
export type Product = Tables<'products'>
export type ProductInsert = TablesInsert<'products'>
export type ProductUpdate = TablesUpdate<'products'>
export type ProductWithType = Views<'products_with_type'>

export type ProductType = Tables<'product_types'>
export type ProductOption = Tables<'product_options'>

export type Order = Tables<'orders'>
export type OrderInsert = TablesInsert<'orders'>
export type OrderUpdate = TablesUpdate<'orders'>
export type OrderWithStatus = Views<'orders_with_status'>

export type OrderItem = Tables<'order_items'>
export type OrderItemInsert = TablesInsert<'order_items'>

export type OrderStatus = Tables<'order_statuses'>
export type AdminProfile = Tables<'admin_profiles'>
