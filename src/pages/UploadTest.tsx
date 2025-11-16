import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { urlToBase64 } from '@/utils/imageToBase64';

const UploadTest = () => {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<string>('');

  const fixTitles = async () => {
    setUploading(true);
    setResult('제목 수정 중...');

    try {
      const { data, error } = await supabase.functions.invoke('fix-article-titles');

      if (error) throw error;

      setResult('제목 수정 성공!');
    } catch (error) {
      console.error(error);
      setResult(`에러: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setUploading(false);
    }
  };

  const uploadArticle2 = async () => {
    setUploading(true);
    setResult('업로드 중...');

    try {
      const thumbnailBase64 = await urlToBase64('/temp-thumbnail-2.webp');
      const content = await fetch('/temp-article-2.md').then(r => r.text());

      const articleData = {
        article_number: 2,
        title: '팬덤은 안정적인 덕질을 원한다 (2) - 실패한 확장 전략',
        summary: '팬덤 플랫폼의 무분별한 확장이 어떻게 실패로 이어지는지, 실제 사례를 통해 분석한다.',
        content,
        category: 'K-POP' as const,
        keywords: ['안정성'],
        published_at: '2025-03-19',
        thumbnail_base64: thumbnailBase64,
        thumbnail_filename: 'IMG_5954.webp',
      };

      const { data, error } = await supabase.functions.invoke('upload-article-with-images', {
        body: articleData,
      });

      if (error) throw error;

      setResult(`2번 성공! 글 ID: ${data.data.id}`);
    } catch (error) {
      console.error(error);
      setResult(`에러: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setUploading(false);
    }
  };

  const uploadArticle3 = async () => {
    setUploading(true);
    setResult('업로드 중...');

    try {
      const thumbnailBase64 = await urlToBase64('/temp-thumbnail-3.webp');

      const articleData = {
        article_number: 3,
        title: '팬덤은 안정적인 덕질을 원한다 (4) - 성공한 확장 전략',
        summary: 'NCT WISH와 레드벨벳 사례처럼 기존 팬덤과의 연결고리를 유지하면서 점진적으로 확장하면 팬덤이 자연스럽게 받아들인다.',
        content: `# 팬덤은 안정적인 덕질을 원한다 (3) - 성공한 확장 전략

지난 글에서 팬덤이 확장을 거부했던 사례를 살펴보았습니다. 하지만 모든 변화가 저항을 받는 것은 아닙니다. 오히려, **팬덤이 변화를 받아들이며 팀이 더욱 강해진 사례도 존재**합니다.

이번 글에서는 **팬덤이 확장을 긍정적으로 받아들인 성공 사례**를 살펴보겠습니다. ****

---

## **1️⃣ 성공한 확장 전략: 팬덤이 받아들인 변화**

🎤 확장에 성공한 사례

- **NCT WISH – 독립적인 정체성을 구축하며 자연스럽게 기존 팀에 녹아든 사례**
- **레드벨벳 – 신규 멤버 합류 후 팀이 더욱 공고해진 사례**

이 두 사례의 공통점은, **팬덤이 기존 멤버들과의 관계를 유지한 채 변화가 이루어졌다는 점**입니다.

단순한 멤버 추가가 아니라, **기존 팬덤과의 연결을 고려한 전략적 확장이었다는 것**이 핵심입니다.

---

## **2️⃣ NCT WISH – 성공적인 신규 팀 도입 사례**

[도입 당시 팬덤 반응]

- 당시 NCT는 총 20명의 멤버(NCT 127, DREAM, WayV)로 구성된 상황에서 팬덤은 **추가 확장에 대한 피로감**이 있었습니다.
- 기존 NCT 팬덤(시즈니) 일부는 새로운 유닛이 **NCT의 정체성을 분산시킬 수 있다**는 우려를 가졌습니다.
- 특히, 기존 팀들과 연차 차이가 크다는 점에서 "같은 그룹이라기보다는 후배 그룹에 가깝다"는 의견도 있었습니다.

**[SM이 NCT WISH 도입을 위해 활용한 전략]**

✔️ **"NCT의 마지막 팀"임을 공식 발표**

- [SM 엔터테인먼트는 NCT WISH를 마지막으로 NCT의 무한 확장을 종료한다고 밝혔습니다.](https://www.starinnews.com/news/articleView.html?idxno=343012)
    
    → 기존 팬덤의 불안 요소(끝없이 추가되는 팀)에 대한 우려를 해소했습니다.
    

✔️ **기존 NCT 멤버와의 연결고리 형성**

- SM 엔터테인먼트의 첫 오디션 프로그램 **'라스타트(Lastart)'를 통해 멤버를 선발,** 기존 NCT 멤버들이 심사위원으로 참여하며 **'마지막 NCT 팀을 뽑는 NCT'라는 내러티브를 만들었습니다.**

✔️ **팬덤과의 접점을 만들기 위한 사전 프로모션**

- 데뷔 4개월 전 일본에서 프리 데뷔 싱글 [Hands Up] 발매했습니다.
- 일본 9개 도시에서 24회에 걸쳐 '엔시티 유니버스 : 라스타트 프리 데뷔 투어' 일본 프리 데뷔 투어를 진행했습니다.

✔️ **기존 NCT 팀들과 차별화된 정체성 구축**

- 'WISH for Our WISH'라는 캐치프레이즈 아래 **청량하면서도 '네오함'을 담은 컨셉**으로 활동할 것을 밝혔습니다.
- Gen-Z 트렌드에 맞춰 **숏폼 콘텐츠(데뷔 이후 3개월간 230개 이상 업로드)** 활용, 자연스럽게 브랜드 인지도를 확대했습니다.

[결과]

- 데뷔 앨범 **'WISH' 한일 선주문량 37만 장, 초동 28만 장 기록했습니다.**
- 한국 활동 시작 **8일 만에 음악방송 첫 1위 달성했습니다.**
- 6개 도시 12회에 걸친 일본 투어 '2024 NCT WISH ASIA TOUR LOG in JAPAN' 전석 매진을 기록했습니다.

**[비즈니스 교훈]**

새로운 유닛을 도입할 때, 기존 브랜드와의 연결고리를 유지하면서도 독립적인 색깔을 확립하는 것이 중요합니다.

---

## **3️⃣ 레드벨벳 – 신규 멤버가 자연스럽게 팀에 녹아든 사례**

**[도입 방식]**

- 2014년 8월 4인조로 데뷔 후, 팀의 음악적 스펙트럼을 확장하기 위해 약 7개월 만에 5번째 멤버(예리) 합류를 발표했습니다.
- **티저 콘텐츠('웰컴 영상')를 통해 변화된 5인조 팀의 모습을 순차적으로 공개**, 팬덤의 기대감을 형성했습니다.
- 기존 멤버들과 겹치지 않는 **올라운더 포지션**으로 합류해서 팀 내 조화를 유지할 것으로 기대되었습니다.
- **신규 멤버는 SM Rookies(SM 엔터테인먼트 공개 연습생) 출신**으로 이미 팬들에게 익숙한 멤버였기에 팬덤의 수용성이 높았습니다.

**[결과]**

- 신규 멤버가 합류한 이후 **미니 1집** <**Ice Cream Cake>로 첫 1위를 달성**했습니다.
- 가온 디지털 차트에서 4위를, 빌보드 세계 디지털곡 차트에서 3위를 기록하였습니다.
- 비평가들로부터 [**레드벨벳이라는 정체성을 확보했다는 긍정적인 평가**](https://web.archive.org/web/20171201032250/http://izm.co.kr/contentRead.asp?idx=26679&bigcateidx=1&subcateidx=3&view_tp=1&view_sort=1)를 받았습니다.

**[비즈니스 교훈]**

신규 멤버를 추가할 때, 기존 팀의 정체성과 조화를 이루는 방식이 중요합니다. 

---

## **📌 결론 - 성공한 확장 전략이 남긴 교훈**

1. **기존 팬덤의 정서를 고려한 확장 전략이 필요하다.**
- NCT WISH와 레드벨벳 모두 **기존 팬덤과의 연결고리를 유지하면서 확장**했습니다.
- 기존 팀과 완전히 분리된 것이 아니라, **브랜드 아이덴티티 내에서 자연스럽게 통합되는 방식**이었습니다.
2.  **새로운 멤버(팀)를 도입할 때, 팬덤의 저항을 줄일 수 있는 사전 작업이 필요하다.**
- NCT WISH의 경우, **데뷔 전 일본 투어 및 프리 싱글 발매**로 팬덤과의 접점을 확대했습니다.
- 레드벨벳의 경우, **SM Rookies로 사전 공개 후 티저 콘텐츠를 활용해 기대감을 조성**했습니다.
3.  **단순한 추가가 아니라, 팀과 팬덤이 함께 성장하는 과정이 중요하다.**
- 팬덤이 변화를 자연스럽게 받아들이려면,**그 변화를 팬덤이 '함께 만든 경험'이라고 느낄 수 있어야 합니다.**`,
        category: 'K-POP' as const,
        keywords: ['안정성'],
        published_at: '2025-03-20',
        thumbnail_base64: thumbnailBase64,
        thumbnail_filename: 'IMG_5955.webp',
      };

      const { data, error } = await supabase.functions.invoke('upload-article-with-images', {
        body: articleData,
      });

      if (error) throw error;

      setResult(`3번 성공! 글 ID: ${data.data.id}`);
    } catch (error) {
      console.error(error);
      setResult(`에러: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setUploading(false);
    }
  };

  const uploadArticle4 = async () => {
    setUploading(true);
    setResult('업로드 중...');

    try {
      const thumbnailBase64 = await urlToBase64('/temp-thumbnail-4.webp');
      const bodyImage1Base64 = await urlToBase64('/temp-body-4-1.png');
      const bodyImage2Base64 = await urlToBase64('/temp-body-4-2.png');

      const content = await fetch('/temp-article-4.md').then(r => r.text());

      const articleData = {
        article_number: 4,
        title: "'우리끼리만의 소통'으로 1억 유저 모으기 (1)",
        summary: 'Weverse, Bubble 같은 팬 전용 플랫폼은 아티스트와의 직접 소통이라는 독점적 경험을 제공해 1억 명 이상의 유저를 확보했다.',
        content,
        category: 'K-POP' as const,
        keywords: ['독점성'],
        published_at: '2025-03-25',
        thumbnail_base64: thumbnailBase64,
        thumbnail_filename: 'Logo-1560x937.webp',
        body_images: [
          {
            base64: bodyImage1Base64,
            filename: 'marriott-bonvoy.png',
            original_path: 'image_1.png',
          },
          {
            base64: bodyImage2Base64,
            filename: 'clubhouse.png',
            original_path: 'image-4.png',
          },
        ],
      };

      const { data, error } = await supabase.functions.invoke('upload-article-with-body-images', {
        body: articleData,
      });

      if (error) throw error;

      setResult(`4번 성공! 글 ID: ${data.data.id}`);
    } catch (error) {
      console.error(error);
      setResult(`에러: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setUploading(false);
    }
  };

  const uploadArticle5 = async () => {
    setUploading(true);
    setResult('업로드 중...');

    try {
      const thumbnailBase64 = await urlToBase64('/temp-thumbnail-5.webp');
      const bodyImage1 = await urlToBase64('/temp-body-5-1.png');
      const bodyImage2 = await urlToBase64('/temp-body-5-2.png');
      const bodyImage3 = await urlToBase64('/temp-body-5-3.png');
      const bodyImage4 = await urlToBase64('/temp-body-5-4.png');
      const bodyImage5 = await urlToBase64('/temp-body-5-5.png');

      const content = await fetch('/temp-article-5.md').then(r => r.text());

      const articleData = {
        article_number: 5,
        title: "'우리끼리만의 소통'으로 1억 유저 모으기 (2)",
        summary: '팬 전용 플랫폼의 독점성 전략은 팬들에게 특별한 존재가 된 듯한 경험을 제공하며 충성도를 극대화한다.',
        content,
        category: 'K-POP' as const,
        keywords: ['독점성'],
        published_at: '2025-03-26',
        thumbnail_base64: thumbnailBase64,
        thumbnail_filename: 'IMG_5956.webp',
        body_images: [
          {
            base64: bodyImage1,
            filename: 'ufotown-1.png',
            original_path: 'image_1-2.png',
          },
          {
            base64: bodyImage2,
            filename: 'ufotown-2.png',
            original_path: 'image-5.png',
          },
          {
            base64: bodyImage3,
            filename: 'bubble.png',
            original_path: 'image_2.png',
          },
          {
            base64: bodyImage4,
            filename: 'weverse-1.png',
            original_path: 'image_3.png',
          },
          {
            base64: bodyImage5,
            filename: 'weverse-2.png',
            original_path: 'image_4.png',
          },
        ],
      };

      const { data, error } = await supabase.functions.invoke('upload-article-with-body-images', {
        body: articleData,
      });

      if (error) throw error;

      setResult(`5번 성공! 글 ID: ${data.data.id}`);
    } catch (error) {
      console.error(error);
      setResult(`에러: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setUploading(false);
    }
  };

  const uploadArticle6 = async () => {
    setUploading(true);
    setResult('업로드 중...');

    try {
      const thumbnailBase64 = await urlToBase64('/temp-thumbnail-6.webp');
      const bodyImage1 = await urlToBase64('/temp-body-6-1.png');
      const bodyImage2 = await urlToBase64('/temp-body-6-2.png');

      const content = await fetch('/temp-article-6.md').then(r => r.text());

      const articleData = {
        article_number: 6,
        title: '사진 한 장에 300만 원?',
        summary: 'K-POP 포토카드는 팬덤 충성도를 자산화하는 핵심 전략으로, 감정 설계부터 반복 소비까지 완결형 수익 구조를 완성한다.',
        content,
        category: 'K-POP' as const,
        keywords: ['독점성'],
        published_at: '2025-03-27',
        thumbnail_base64: thumbnailBase64,
        thumbnail_filename: '2024033107020785565_1.webp',
        body_images: [
          {
            base64: bodyImage1,
            filename: 'poca-market.png',
            original_path: 'image_1-3.png',
          },
          {
            base64: bodyImage2,
            filename: 'banpo-poca.png',
            original_path: 'image-6.png',
          },
        ],
      };

      const { data, error } = await supabase.functions.invoke('upload-article-with-body-images', {
        body: articleData,
      });

      if (error) throw error;

      setResult(`6번 성공! 글 ID: ${data.data.id}`);
    } catch (error) {
      console.error(error);
      setResult(`에러: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setUploading(false);
    }
  };

  const uploadArticle7 = async () => {
    setUploading(true);
    setResult('업로드 중...');

    try {
      const thumbnailBase64 = await urlToBase64('/temp-thumbnail-7.webp');
      const bodyImage1 = await urlToBase64('/temp-body-7-1.png');
      const bodyImage2 = await urlToBase64('/temp-body-7-2.png');

      const content = await fetch('/temp-article-7.md').then(r => r.text());

      const articleData = {
        article_number: 7,
        title: '조그만 인형, 63억 원어치가 팔린 이유',
        summary: '라이즈의 인형 굿즈는 아티스트 직접 참여와 팬덤 놀이문화를 결합해 단순 상품을 넘어 팬덤 커뮤니티의 핵심 자산이 되었다.',
        content,
        category: 'K-POP' as const,
        keywords: ['독점성'],
        published_at: '2025-03-28',
        thumbnail_base64: thumbnailBase64,
        thumbnail_filename: '20240621160714_7e687bdb14ab4f9c9101fdf9201a16e8.webp',
        body_images: [
          {
            base64: bodyImage1,
            filename: 'riize-doll-meme.png',
            original_path: 'image_1.png',
          },
          {
            base64: bodyImage2,
            filename: 'riize-doll-sold.png',
            original_path: 'image_2.png',
          },
        ],
      };

      const { data, error } = await supabase.functions.invoke('upload-article-with-body-images', {
        body: articleData,
      });

      if (error) throw error;

      setResult(`7번 성공! 글 ID: ${data.data.id}`);
    } catch (error) {
      console.error(error);
      setResult(`에러: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setUploading(false);
    }
  };

  const uploadArticle8 = async () => {
    setUploading(true);
    setResult('8번 글 업로드 중...');
    
    try {
      const thumbnailBase64 = await urlToBase64('/temp-thumbnail-8.jpeg');
      const body1Base64 = await urlToBase64('/temp-body-8-1.png');
      const body2Base64 = await urlToBase64('/temp-body-8-2.jpg');
      const body3Base64 = await urlToBase64('/temp-body-8-3.jpg');
      const body4Base64 = await urlToBase64('/temp-body-8-4.webp');
      const contentResponse = await fetch('/temp-article-8.md');
      const content = await contentResponse.text();
      
      const { data, error } = await supabase.functions.invoke('upload-article-with-body-images', {
        body: {
          article_number: 8,
          title: "실물 앨범 이제 '기능'이 아닌 '감정'을 판다",
          summary: "SM은 앨범을 음악이 담긴 CD가 아닌, 팬들의 감정과 소유 욕구를 자극하는 '컬렉터블 아이템'으로 재해석하고 있습니다. 그 중심에는 앨범 자체를 '경험 상품'으로 전환하는 디자인 전략이 있습니다.",
          content,
          category: 'K-POP',
          keywords: ['K-POP', 'SM', '앨범', '디자인', '감정', '컬렉션'],
          published_at: '2024-12-15T09:00:00Z',
          thumbnail: thumbnailBase64,
          body_images: [
            { path: 'image_1.png', data: body1Base64 },
            { path: 'image_2.png', data: body2Base64 },
            { path: 'image_3.png', data: body3Base64 },
            { path: 'image_4.png', data: body4Base64 }
          ]
        }
      });

      if (error) throw error;
      setResult('8번 글 업로드 완료: ' + JSON.stringify(data));
    } catch (error: any) {
      setResult('8번 글 업로드 실패: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const uploadArticle9 = async () => {
    setUploading(true);
    setResult('9번 글 업로드 중...');
    
    try {
      const thumbnailBase64 = await urlToBase64('/temp-thumbnail-9.jpeg');
      const body1Base64 = await urlToBase64('/temp-body-9-1.jpeg');
      const body2Base64 = await urlToBase64('/temp-body-9-2.png');
      const body3Base64 = await urlToBase64('/temp-body-9-3.png');
      const body4Base64 = await urlToBase64('/temp-body-9-4.png');
      const body5Base64 = await urlToBase64('/temp-body-9-5.jpg');
      const body6Base64 = await urlToBase64('/temp-body-9-6.png');
      const body7Base64 = await urlToBase64('/temp-body-9-7.jpeg');
      const body8Base64 = await urlToBase64('/temp-body-9-8.png');
      const contentResponse = await fetch('/temp-article-9.md');
      const content = await contentResponse.text();
      
      const { data, error } = await supabase.functions.invoke('upload-article-with-body-images', {
        body: {
          article_number: 9,
          title: "팬은 기다림도 소비한다",
          summary: "K팝에서 앨범은 더 이상 '발매일'만 중요한 게 아닙니다. 앨범이 나오기 전의 모든 시간, 그 기다림조차도 팬에게는 하나의 설계된 경험이 됩니다. 그리고 이 '설렘의 시간'이 실제 앨범 구매로 이어지고 있습니다.",
          content,
          category: 'K-POP',
          keywords: ['K-POP', 'NCT WISH', '팬 경험', '앨범', '마케팅', '프로모션'],
          published_at: '2025-04-03T09:00:00Z',
          thumbnail_base64: thumbnailBase64,
          thumbnail_filename: 'thumbnail-9.jpeg',
          body_images: [
            { base64: body1Base64, filename: 'body-9-1.jpeg', original_path: 'temp-body-9-1.jpeg' },
            { base64: body2Base64, filename: 'body-9-2.png', original_path: 'temp-body-9-2.png' },
            { base64: body3Base64, filename: 'body-9-3.png', original_path: 'temp-body-9-3.png' },
            { base64: body4Base64, filename: 'body-9-4.png', original_path: 'temp-body-9-4.png' },
            { base64: body5Base64, filename: 'body-9-5.jpg', original_path: 'temp-body-9-5.jpg' },
            { base64: body6Base64, filename: 'body-9-6.png', original_path: 'temp-body-9-6.png' },
            { base64: body7Base64, filename: 'body-9-7.jpeg', original_path: 'temp-body-9-7.jpeg' },
            { base64: body8Base64, filename: 'body-9-8.png', original_path: 'temp-body-9-8.png' }
          ]
        }
      });

      if (error) throw error;
      setResult('9번 글 업로드 완료: ' + JSON.stringify(data));
    } catch (error: any) {
      setResult('9번 글 업로드 실패: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">글 업로드 테스트</h1>
      <div className="mb-6 p-4 bg-yellow-50 rounded">
        <h2 className="font-bold mb-2">1단계: 제목 수정</h2>
        <Button onClick={fixTitles} disabled={uploading} variant="outline">
          {uploading ? '처리 중...' : '1, 3번 글 제목 수정'}
        </Button>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Button onClick={uploadArticle2} disabled={uploading}>
          {uploading ? '업로드 중...' : '2번 글 업로드'}
        </Button>
        <Button onClick={uploadArticle3} disabled={uploading}>
          {uploading ? '업로드 중...' : '3번 글 업로드'}
        </Button>
        <Button onClick={uploadArticle4} disabled={uploading}>
          {uploading ? '업로드 중...' : '4번 글 업로드'}
        </Button>
        <Button onClick={uploadArticle5} disabled={uploading}>
          {uploading ? '업로드 중...' : '5번 글 업로드'}
        </Button>
        <Button onClick={uploadArticle6} disabled={uploading}>
          {uploading ? '업로드 중...' : '6번 글 업로드'}
        </Button>
        <Button onClick={uploadArticle7} disabled={uploading}>
          {uploading ? '업로드 중...' : '7번 글 업로드'}
        </Button>
        <Button onClick={uploadArticle8} disabled={uploading}>
          {uploading ? '업로드 중...' : '8번 글 업로드'}
        </Button>
        <Button onClick={uploadArticle9} disabled={uploading}>
          {uploading ? '업로드 중...' : '9번 글 업로드'}
        </Button>
      </div>
      {result && <p className="mt-4">{result}</p>}
    </div>
  );
};

export default UploadTest;
