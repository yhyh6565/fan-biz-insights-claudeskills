import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TiptapEditor from "@/components/editor/TiptapEditor";
import { StatsDashboard } from "@/components/admin/StatsDashboard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Loader2, LogOut } from "lucide-react";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAdmin();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"K-POP" | "MCU" | "">("");
  const [keywords, setKeywords] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `thumbnail-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(fileName);

      setThumbnailUrl(publicUrl);
      toast({
        title: "썸네일 업로드 완료",
        description: "썸네일이 성공적으로 업로드되었습니다.",
      });
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      toast({
        title: "썸네일 업로드 실패",
        description: "썸네일을 업로드하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category) {
      toast({
        title: "카테고리 선택 필요",
        description: "카테고리를 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get the highest article number
      const { data: existingArticles, error: fetchError } = await supabase
        .from("articles")
        .select("article_number")
        .order("article_number", { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      const nextArticleNumber = existingArticles && existingArticles.length > 0 
        ? existingArticles[0].article_number + 1 
        : 1;

      const keywordsArray = keywords.split(',').map(k => k.trim()).filter(k => k);

      // Add copyright notice to content
      const copyrightNotice = '<hr class="my-8"><p class="text-center text-sm text-muted-foreground">© 2025. Yeonhee Do All Rights Reserved.</p>';
      const contentWithCopyright = content + copyrightNotice;

      const { error: insertError } = await supabase
        .from("articles")
        .insert({
          article_number: nextArticleNumber,
          title,
          summary,
          content: contentWithCopyright,
          category,
          keywords: keywordsArray,
          thumbnail: thumbnailUrl || null,
          hero_image: null,
          published_at: new Date().toISOString(),
        });

      if (insertError) throw insertError;

      toast({
        title: "글 발행 완료",
        description: "글이 성공적으로 발행되었습니다.",
      });

      // Reset form
      setTitle("");
      setSummary("");
      setContent("");
      setCategory("");
      setKeywords("");
      setThumbnailUrl("");
    } catch (error) {
      console.error('Error publishing article:', error);
      toast({
        title: "글 발행 실패",
        description: "글을 발행하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">관리자 페이지</h1>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            로그아웃
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="editor">글 에디터</TabsTrigger>
            <TabsTrigger value="stats">통계 대시보드</TabsTrigger>
          </TabsList>

          <TabsContent value="editor">
            <Card>
              <CardHeader>
                <CardTitle>새 글 작성</CardTitle>
                <CardDescription>새로운 글을 작성하고 발행하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">제목 *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="글 제목을 입력하세요"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary">요약 *</Label>
                    <Textarea
                      id="summary"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="글 요약을 입력하세요"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">카테고리 *</Label>
                    <Select value={category} onValueChange={(value: "K-POP" | "MCU") => setCategory(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="K-POP">K-POP</SelectItem>
                        <SelectItem value="MCU">MCU</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keywords">키워드 (쉼표로 구분)</Label>
                    <Input
                      id="keywords"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="예: 팬덤, 비즈니스, 마케팅"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">썸네일 이미지</Label>
                    <Input
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                    />
                    {thumbnailUrl && (
                      <img src={thumbnailUrl} alt="Thumbnail preview" className="mt-2 max-w-xs rounded-lg" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>본문 *</Label>
                    <TiptapEditor content={content} onChange={setContent} />
                  </div>

                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    발행하기
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <StatsDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
