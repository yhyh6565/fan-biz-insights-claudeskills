import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.78.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyticsPayload {
  sessionId: string;
  path: string;
  referrer: string;
  articleId?: string;
  timeSpent?: number;
  isNewVisitor: boolean;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const payload: AnalyticsPayload = await req.json();
    const today = new Date().toISOString().split('T')[0];

    console.log('Tracking analytics:', payload);

    // Get or create today's analytics record
    const { data: analytics, error: analyticsError } = await supabase
      .from('analytics')
      .select('*')
      .eq('date', today)
      .maybeSingle();

    if (analyticsError && analyticsError.code !== 'PGRST116') {
      throw analyticsError;
    }

    if (analytics) {
      // Update existing record
      const updates: any = {
        page_views: analytics.page_views + 1,
      };

      if (payload.isNewVisitor) {
        updates.unique_visitors = analytics.unique_visitors + 1;
      }

      if (payload.timeSpent) {
        const totalTimeSpent = analytics.avg_time_seconds * analytics.page_views + payload.timeSpent;
        updates.avg_time_seconds = Math.round(totalTimeSpent / (analytics.page_views + 1));
      }

      await supabase
        .from('analytics')
        .update(updates)
        .eq('date', today);
    } else {
      // Create new record
      await supabase
        .from('analytics')
        .insert({
          date: today,
          unique_visitors: payload.isNewVisitor ? 1 : 0,
          page_views: 1,
          avg_time_seconds: payload.timeSpent || 0,
          bounce_rate: 0,
        });
    }

    // Track traffic source
    if (payload.referrer && payload.referrer !== window.location.origin) {
      const source = new URL(payload.referrer).hostname;
      
      const { data: existingSource } = await supabase
        .from('traffic_sources')
        .select('*')
        .eq('date', today)
        .eq('source', source)
        .maybeSingle();

      if (existingSource) {
        await supabase
          .from('traffic_sources')
          .update({ visitors: existingSource.visitors + 1 })
          .eq('date', today)
          .eq('source', source);
      } else {
        await supabase
          .from('traffic_sources')
          .insert({
            date: today,
            source,
            visitors: 1,
          });
      }
    }

    // Increment article views if article page
    if (payload.articleId) {
      await supabase.rpc('increment_article_views', {
        article_id: payload.articleId,
      });
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error tracking analytics:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
