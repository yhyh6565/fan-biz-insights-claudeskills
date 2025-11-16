import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.78.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Fixing article titles...');

    // Fix article 1 title
    const { error: error1 } = await supabase
      .from('articles')
      .update({ title: '팬덤은 안정적인 덕질을 원한다 (1)' })
      .eq('article_number', 1);

    if (error1) throw error1;

    // Fix article 3 title
    const { error: error3 } = await supabase
      .from('articles')
      .update({ title: '팬덤은 안정적인 덕질을 원한다 (3) - 성공한 확장 전략' })
      .eq('article_number', 3);

    if (error3) throw error3;

    console.log('Article titles fixed successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Titles updated' }),
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
