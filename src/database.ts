export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  next_auth: {
    Tables: {
      accounts: {
        Row: {
          access_token: string | null;
          expires_at: number | null;
          id: string;
          id_token: string | null;
          oauth_token: string | null;
          oauth_token_secret: string | null;
          provider: string;
          providerAccountId: string;
          refresh_token: string | null;
          scope: string | null;
          session_state: string | null;
          token_type: string | null;
          type: string;
          userId: string | null;
        };
        Insert: {
          access_token?: string | null;
          expires_at?: number | null;
          id?: string;
          id_token?: string | null;
          oauth_token?: string | null;
          oauth_token_secret?: string | null;
          provider: string;
          providerAccountId: string;
          refresh_token?: string | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type: string;
          userId?: string | null;
        };
        Update: {
          access_token?: string | null;
          expires_at?: number | null;
          id?: string;
          id_token?: string | null;
          oauth_token?: string | null;
          oauth_token_secret?: string | null;
          provider?: string;
          providerAccountId?: string;
          refresh_token?: string | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type?: string;
          userId?: string | null;
        };
      };
      sessions: {
        Row: {
          expires: string;
          id: string;
          sessionToken: string;
          userId: string | null;
        };
        Insert: {
          expires: string;
          id?: string;
          sessionToken: string;
          userId?: string | null;
        };
        Update: {
          expires?: string;
          id?: string;
          sessionToken?: string;
          userId?: string | null;
        };
      };
      users: {
        Row: {
          email: string | null;
          emailVerified: string | null;
          id: string;
          image: string | null;
          firstName: string | null;
          lastName: string | null;
          isAdmin: boolean | null;
          isEnabled: boolean | null;
        };
        Insert: {
          email?: string | null;
          emailVerified?: string | null;
          id?: string;
          image?: string | null;
          firstName?: string | null;
          lastName?: string | null;
          isAdmin?: boolean | null;
          isEnabled?: boolean | null;
        };
        Update: {
          email?: string | null;
          emailVerified?: string | null;
          id?: string;
          image?: string | null;
          firstName?: string | null;
          lastName?: string | null;
          isAdmin?: boolean | null;
          isEnabled?: boolean | null;
        };
      };
      verification_tokens: {
        Row: {
          expires: string;
          identifier: string | null;
          token: string;
        };
        Insert: {
          expires: string;
          identifier?: string | null;
          token: string;
        };
        Update: {
          expires?: string;
          identifier?: string | null;
          token?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      uid: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      answer: {
        Row: {
          created_at: string | null;
          id: string;
          image: string | null;
          name: string | null;
          question: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          image?: string | null;
          name?: string | null;
          question?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
          question?: string | null;
        };
      };
      books: {
        Row: {
          color: string | null;
          created_at: string | null;
          id: string;
          name: string | null;
        };
        Insert: {
          color?: string | null;
          created_at?: string | null;
          id?: string;
          name?: string | null;
        };
        Update: {
          color?: string | null;
          created_at?: string | null;
          id?: string;
          name?: string | null;
        };
      };
      chapters: {
        Row: {
          book: string | null;
          created_at: string | null;
          id: string;
          name: string | null;
          parent: string | null;
        };
        Insert: {
          book?: string | null;
          created_at?: string | null;
          id?: string;
          name?: string | null;
          parent?: string | null;
        };
        Update: {
          book?: string | null;
          created_at?: string | null;
          id?: string;
          name?: string | null;
          parent?: string | null;
        };
      };
      question_images: {
        Row: {
          created_at: string | null;
          id: string;
          image: string | null;
          question: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          image?: string | null;
          question?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          image?: string | null;
          question?: string | null;
        };
      };
      questions: {
        Row: {
          book: string | null;
          chapter: string | null;
          created_at: string | null;
          description: string | null;
          id: string;
          name: string | null;
        };
        Insert: {
          book?: string | null;
          chapter?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string | null;
        };
        Update: {
          book?: string | null;
          chapter?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string | null;
        };
      };
      user_books_assignation: {
        Row: {
          book: string | null;
          created_at: string | null;
          id: string;
          user: string | null;
        };
        Insert: {
          book?: string | null;
          created_at?: string | null;
          id?: string;
          user?: string | null;
        };
        Update: {
          book?: string | null;
          created_at?: string | null;
          id?: string;
          user?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
