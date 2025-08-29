import {
  http, HttpResponse,
} from "msw";
import {summaryTexts } from '@/mock/__fixture__/summaryTexts';

const summaryArray = Object.entries(summaryTexts).reduce((acc: Record<string, string[]>, text) => {
  acc[text[0]] = text[1].split("");
  return acc;
}, {});

export const handlers = [
  
  // SSE (Server-Sent Events) handler
  http.get("/api/sse", ({ request }) => {
    const url = new URL(request.url);
    const interval =20;
    const summaryKey = url.searchParams.get('summary');
    const maxCount = summaryKey && summaryArray[summaryKey].length || 10;
    
    const stream = new ReadableStream({
      start(controller) {
        let counter = 0;
        
        const sendEvent = () => {
          let message = "";
          
          // If summary key is provided and exists in summaryArray, use summary text
          if (summaryKey && summaryArray[summaryKey] && summaryArray[summaryKey][counter]) {
            message = summaryArray[summaryKey][counter];
          }
          
          const data = {
            id: counter,
            message,
            timestamp: new Date().toISOString(),
            type: 'update',
          };
          
          const eventData = `data: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(new TextEncoder().encode(eventData));
          
          counter++;
          
          if (counter < maxCount) {
            setTimeout(sendEvent, interval); // Send event with custom interval
          } else {
            // Send final event and close
            controller.enqueue(new TextEncoder().encode('data: {"type":"close","message":"Stream ended"}\n\n'));
            controller.close();
          }
        };
        
        // Send initial event
        sendEvent();
      }
    });
    
    return new HttpResponse(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
      }
    });
  }),
  
  http.get(`/api/whoami`, () => {
    return HttpResponse.json({
      status: 200,
      data: {
        name: 'Riting LIU',
        email: 'ritingliu@example.com',
        telephone: '1234567890',
        work: 'Frontend Programmer',
        location: 'Hong Kong',
        image: 'https://p26-passport.byteacctimg.com/img/user-avatar/5106214993d065fb18ed324a80286dc3~90x90.awebp',
      },
    });
  }),
]