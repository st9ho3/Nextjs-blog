// app/api/convert/[articleID]/route.ts
import { NextResponse } from 'next/server';
import { getArticleById } from '@/app/_db/services';

export async function GET(
  request: Request
) {
  const articleID = new URL(request.url).pathname.slice(5)
  try {
    const article = await getArticleById(articleID);
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    /* const editor = ServerBlockNoteEditor.create();
    const html = await editor.blocksToFullHTML(article.content); */

    return NextResponse.json( articleID );
  } catch (error) {
    console.error('Error processing article:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}