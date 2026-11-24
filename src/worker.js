import {requestAI,validate} from '../web/engine.js';
const MAX=100000;
const extensionOrigin=/^chrome-extension:\/\/[a-p]{32}$/;
async function readBody(req){
 const reader=req.body?.getReader(); if(!reader)throw new Error('empty');
 let size=0;const chunks=[];
 try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>MAX){await reader.cancel();throw new RangeError('large');}chunks.push(value);}}finally{reader.releaseLock()}
 const buf=new Uint8Array(size);let offset=0;for(const chunk of chunks){buf.set(chunk,offset);offset+=chunk.length;}return JSON.parse(new TextDecoder().decode(buf));
}
export default {async fetch(req,env){
 const url=new URL(req.url);if(!url.pathname.startsWith('/api/'))return env.ASSETS.fetch(req);
 const origin=req.headers.get('Origin');const accepted=!origin||origin===url.origin||extensionOrigin.test(origin);
 const headers={'Cache-Control':'no-store','Content-Type':'application/json; charset=utf-8','X-Content-Type-Options':'nosniff','Vary':'Origin'};
 if(origin&&accepted)headers['Access-Control-Allow-Origin']=origin;
 const json=(status,data)=>new Response(JSON.stringify(data),{status,headers});
 if(!accepted)return json(403,{error:'Origin không hợp lệ.'});
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers:{...headers,'Access-Control-Allow-Methods':'POST, GET, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Access-Control-Max-Age':'600'}});
 if(url.pathname==='/api/health'&&req.method==='GET')return json(200,{ok:true,version:'0.2.0'});
 if(url.pathname!=='/api/translate')return json(404,{error:'Không tìm thấy API.'});
 if(req.method!=='POST')return json(405,{error:'Chỉ hỗ trợ POST.'});
 if(!/^application\/json(?:;|$)/i.test(req.headers.get('Content-Type')||''))return json(415,{error:'Cần JSON.'});
 try{const {success}=await env.TRANSLATE_LIMIT.limit({key:req.headers.get('CF-Connecting-IP')||'unknown'});if(!success)return json(429,{error:'Quá nhiều yêu cầu. Thử lại sau.'});}catch{return json(503,{error:'Bộ giới hạn yêu cầu chưa sẵn sàng.'});}
 let p;try{p=await readBody(req);if(!['gemini','openai'].includes(p?.provider))return json(400,{error:'Cloud chỉ hỗ trợ Gemini và OpenAI.'});validate(p);if(!/^[\w.-]+$/.test(p.model))throw new Error('model');}catch(e){return json(e instanceof RangeError?413:400,{error:'Dữ liệu không hợp lệ hoặc thiếu API key.'});}
 try{return json(200,await requestAI(p));}catch(e){const message=String(e?.message||'');return json(502,{error:/^AI trả về HTTP \d{3}\./.test(message)?message:'Không thể nhận kết quả AI. Kiểm tra model, key và thử lại.'});}
}};
