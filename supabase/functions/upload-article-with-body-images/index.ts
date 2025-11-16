import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.78.0';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ArticleSchema = z.object({
  article_number: z.number().int().positive(),
  title: z.string().trim().min(1).max(200),
  summary: z.string().trim().min(1).max(500),
  content: z.string().trim().min(1).max(50000),
  category: z.enum(['K-POP', 'MCU']),
  keywords: z.array(z.string().trim().min(1).max(50)).max(10),
  published_at: z.string(),
  thumbnail_base64: z.string().optional(),
  thumbnail_filename: z.string().max(255).optional(),
  body_images: z.array(z.object({
    base64: z.string(),
    filename: z.string().max(255),
    original_path: z.string().max(500)
  })).max(20).optional(),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify user and admin role
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    // Check admin role
    const { data: roleData, error: roleError } = await supabase.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    });

    if (roleError || !roleData) {
      console.error('Role check error:', roleError);
      return new Response(
        JSON.stringify({ error: 'Forbidden: Admin access required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      );
    }

    // Validate input
    const body = await req.json();
    const validationResult = ArticleSchema.safeParse(body);
    
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid input', details: validationResult.error.format() }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const validatedData = validationResult.data;

    console.log('Uploading article:', {
      article_number: validatedData.article_number,
      title: validatedData.title,
      category: validatedData.category,
      has_thumbnail: !!validatedData.thumbnail_base64,
      body_images_count: validatedData.body_images?.length || 0,
    });

    let thumbnailUrl: string | null = null;
    let heroImageUrl: string | null = null;
    let updatedContent = validatedData.content;

    // Upload thumbnail if provided
    if (validatedData.thumbnail_base64 && validatedData.thumbnail_filename) {
      console.log('Uploading thumbnail:', validatedData.thumbnail_filename);
      
      const base64Data = validatedData.thumbnail_base64.split(',')[1];
      const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
      
      const filePath = `thumbnails/${validatedData.article_number}-${validatedData.thumbnail_filename}`;
      
      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(filePath, binaryData, {
          contentType: validatedData.thumbnail_base64.split(';')[0].split(':')[1],
          upsert: true,
        });

      if (uploadError) {
        console.error('Thumbnail upload error:', uploadError);
        throw uploadError;
      }

      const { data: urlData } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      thumbnailUrl = urlData.publicUrl;
      heroImageUrl = urlData.publicUrl;
      
      console.log('Thumbnail uploaded:', thumbnailUrl);
    }

    // Upload body images and replace paths in content
    if (validatedData.body_images && validatedData.body_images.length > 0) {
      console.log('Uploading body images:', validatedData.body_images.length);
      
      for (const image of validatedData.body_images) {
        const base64Data = image.base64.split(',')[1];
        const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        
        const filePath = `body-images/${validatedData.article_number}-${image.filename}`;
        
        const { error: uploadError } = await supabase.storage
          .from('article-images')
          .upload(filePath, binaryData, {
            contentType: image.base64.split(';')[0].split(':')[1],
            upsert: true,
          });

        if (uploadError) {
          console.error('Body image upload error:', uploadError);
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('article-images')
          .getPublicUrl(filePath);

        // Replace image path in content
        updatedContent = updatedContent.replace(
          new RegExp(image.original_path, 'g'),
          urlData.publicUrl
        );
        
        console.log('Body image uploaded:', urlData.publicUrl);
      }
    }

    // Insert article into database
    const { data, error } = await supabase
      .from('articles')
      .insert({
        article_number: validatedData.article_number,
        title: validatedData.title,
        summary: validatedData.summary,
        content: updatedContent,
        category: validatedData.category,
        keywords: validatedData.keywords,
        published_at: validatedData.published_at,
        thumbnail: thumbnailUrl,
        hero_image: heroImageUrl,
      })
      .select()
      .single();

    if (error) {
      console.error('Insert error:', error);
      throw error;
    }

    console.log('Article uploaded successfully:', data.id);

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
