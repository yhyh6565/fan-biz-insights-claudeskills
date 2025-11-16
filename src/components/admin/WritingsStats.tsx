import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, Search } from "lucide-react";
import type { ArticleStats } from "@/types/admin";

interface WritingsStatsProps {
  articles: ArticleStats[];
}

export function WritingsStats({ articles }: WritingsStatsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortColumn, setSortColumn] = useState<"views" | "likes" | "shares" | "publishedAt">("views");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (column: "views" | "likes" | "shares" | "publishedAt") => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection(column === "publishedAt" ? "desc" : "desc");
    }
  };

  const getFilteredByDate = (article: ArticleStats) => {
    if (dateFilter === "all") return true;
    
    const publishedDate = new Date(article.publishedAt);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24));
    
    switch (dateFilter) {
      case "7days":
        return daysDiff <= 7;
      case "30days":
        return daysDiff <= 30;
      case "90days":
        return daysDiff <= 90;
      default:
        return true;
    }
  };

  const filteredAndSortedArticles = (articles || [])
    .filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === "all" || article.category === category;
      const matchesDate = getFilteredByDate(article);
      return matchesSearch && matchesCategory && matchesDate;
    })
    .sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (sortColumn === "publishedAt") {
        const aDate = new Date(aValue as string).getTime();
        const bDate = new Date(bValue as string).getTime();
        return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
      }
      
      const aNum = aValue as number;
      const bNum = bValue as number;
      return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>글 성과 분석</CardTitle>
          <CardDescription>발행된 글의 조회수, 좋아요, 공유수 통계</CardDescription>
        </CardHeader>
        <CardContent>
          {/* 필터 섹션 */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="글 제목 검색..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="K-POP">K-POP</SelectItem>
                <SelectItem value="MCU">MCU</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="발행일" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="7days">최근 7일</SelectItem>
                <SelectItem value="30days">최근 30일</SelectItem>
                <SelectItem value="90days">최근 90일</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 테이블 */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">제목</TableHead>
                  <TableHead className="w-[15%]">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("publishedAt")}
                      className="h-8 px-2"
                    >
                      발행일
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[10%]">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("views")}
                      className="h-8 px-2"
                    >
                      조회수
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[10%]">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("likes")}
                      className="h-8 px-2"
                    >
                      좋아요
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[10%]">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("shares")}
                      className="h-8 px-2"
                    >
                      공유수
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[15%]">카테고리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedArticles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      검색 결과가 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">
                        <div className="truncate max-w-[400px]" title={article.title}>
                          {article.title}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(article.publishedAt)}</TableCell>
                      <TableCell>{article.views.toLocaleString()}</TableCell>
                      <TableCell>{article.likes.toLocaleString()}</TableCell>
                      <TableCell>{article.shares.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                          {article.category}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* 총 결과 수 */}
          <div className="mt-4 text-sm text-muted-foreground">
            총 {filteredAndSortedArticles.length}개의 글
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
