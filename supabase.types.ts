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
      consumer_order_items: {
        Row: {
          created_at: string
          id: string
          order: string
          product: string
          quantity: number
          unit: Database["public"]["Enums"]["unit"]
        }
        Insert: {
          created_at?: string
          id?: string
          order: string
          product: string
          quantity: number
          unit: Database["public"]["Enums"]["unit"]
        }
        Update: {
          created_at?: string
          id?: string
          order?: string
          product?: string
          quantity?: number
          unit?: Database["public"]["Enums"]["unit"]
        }
        Relationships: [
          {
            foreignKeyName: "consumer_order_items_order_fkey"
            columns: ["order"]
            isOneToOne: false
            referencedRelation: "consumer_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consumer_order_items_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      consumer_orders: {
        Row: {
          consumer: string
          created_at: string
          id: string
          status: Database["public"]["Enums"]["order_status"]
          store: string
        }
        Insert: {
          consumer: string
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["order_status"]
          store: string
        }
        Update: {
          consumer?: string
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["order_status"]
          store?: string
        }
        Relationships: [
          {
            foreignKeyName: "consumer_orders_consumer_fkey"
            columns: ["consumer"]
            isOneToOne: false
            referencedRelation: "consumers"
            referencedColumns: ["user"]
          },
          {
            foreignKeyName: "consumer_orders_store_fkey"
            columns: ["store"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          }
        ]
      }
      consumers: {
        Row: {
          created_at: string
          name: string
          user: string
        }
        Insert: {
          created_at?: string
          name: string
          user: string
        }
        Update: {
          created_at?: string
          name?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "consumers_user_fkey"
            columns: ["user"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      product_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string
          id: string
          name: string
          origin: string | null
          size: string | null
          type: string | null
          wholesaler: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          name: string
          origin?: string | null
          size?: string | null
          type?: string | null
          wholesaler: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          name?: string
          origin?: string | null
          size?: string | null
          type?: string | null
          wholesaler?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_wholesaler_fkey"
            columns: ["wholesaler"]
            isOneToOne: false
            referencedRelation: "wholesalers"
            referencedColumns: ["id"]
          }
        ]
      }
      retailer_staff: {
        Row: {
          created_at: string
          retailer: string
          staff: string
        }
        Insert: {
          created_at?: string
          retailer: string
          staff: string
        }
        Update: {
          created_at?: string
          retailer?: string
          staff?: string
        }
        Relationships: [
          {
            foreignKeyName: "retailer_staff_retailer_fkey"
            columns: ["retailer"]
            isOneToOne: false
            referencedRelation: "retailers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "retailer_staff_staff_fkey"
            columns: ["staff"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      retailers: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      store_inventory: {
        Row: {
          created_at: string
          product: string
          stock: number
          store: string
          unit: Database["public"]["Enums"]["unit"]
        }
        Insert: {
          created_at?: string
          product: string
          stock: number
          store: string
          unit: Database["public"]["Enums"]["unit"]
        }
        Update: {
          created_at?: string
          product?: string
          stock?: number
          store?: string
          unit?: Database["public"]["Enums"]["unit"]
        }
        Relationships: [
          {
            foreignKeyName: "store_products_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_products_store_fkey"
            columns: ["store"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          }
        ]
      }
      store_order_items: {
        Row: {
          created_at: string
          id: string
          price: number
          quantity: number
          store_order: string
          wholesaler_product: string
        }
        Insert: {
          created_at?: string
          id?: string
          price: number
          quantity: number
          store_order: string
          wholesaler_product: string
        }
        Update: {
          created_at?: string
          id?: string
          price?: number
          quantity?: number
          store_order?: string
          wholesaler_product?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_retailer_order_products_product_fkey"
            columns: ["wholesaler_product"]
            isOneToOne: false
            referencedRelation: "wholesaler_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_store_order_items_store_order_fkey"
            columns: ["store_order"]
            isOneToOne: false
            referencedRelation: "store_orders"
            referencedColumns: ["id"]
          }
        ]
      }
      store_orders: {
        Row: {
          created_at: string
          created_by: string
          id: string
          status: Database["public"]["Enums"]["order_status"]
          store: string
          wholesaler: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: string
          status?: Database["public"]["Enums"]["order_status"]
          store: string
          wholesaler: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          status?: Database["public"]["Enums"]["order_status"]
          store?: string
          wholesaler?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_retailer_orders_wholesaler_fkey"
            columns: ["wholesaler"]
            isOneToOne: false
            referencedRelation: "wholesalers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_store_orders_store_fkey"
            columns: ["store"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          }
        ]
      }
      stores: {
        Row: {
          address: string
          created_at: string
          id: string
          retailer: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          retailer: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          retailer?: string
        }
        Relationships: [
          {
            foreignKeyName: "stores_retailer_fkey"
            columns: ["retailer"]
            isOneToOne: false
            referencedRelation: "retailers"
            referencedColumns: ["id"]
          }
        ]
      }
      wholesaler_products: {
        Row: {
          created_at: string
          id: string
          price: number | null
          product: string
          quantity: number
          unit: Database["public"]["Enums"]["unit"]
          wholesaler: string
        }
        Insert: {
          created_at?: string
          id?: string
          price?: number | null
          product: string
          quantity: number
          unit: Database["public"]["Enums"]["unit"]
          wholesaler: string
        }
        Update: {
          created_at?: string
          id?: string
          price?: number | null
          product?: string
          quantity?: number
          unit?: Database["public"]["Enums"]["unit"]
          wholesaler?: string
        }
        Relationships: [
          {
            foreignKeyName: "wholesaler_products_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wholesaler_products_wholesaler_fkey"
            columns: ["wholesaler"]
            isOneToOne: false
            referencedRelation: "wholesalers"
            referencedColumns: ["id"]
          }
        ]
      }
      wholesalers: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      order_status:
        | "created"
        | "paid"
        | "packing"
        | "packed"
        | "delivering"
        | "delivered"
        | "cancelled"
        | "declined"
      unit: "g" | "kg" | "ml" | "l"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
