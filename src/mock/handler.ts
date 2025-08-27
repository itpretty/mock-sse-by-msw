import {
  http, HttpResponse,
} from "msw";

export const handlers = [
  
  // SSE (Server-Sent Events) handler
  http.get("/api/sse", () => {
    const stream = new ReadableStream({
      start(controller) {
        let counter = 0;
        
        const sendEvent = () => {
          const data = {
            id: counter,
            message: `Server message ${counter}`,
            timestamp: new Date().toISOString(),
            type: 'update'
          };
          
          const eventData = `data: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(new TextEncoder().encode(eventData));
          
          counter++;
          
          if (counter < 10) {
            setTimeout(sendEvent, 1000); // Send event every second
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