// User-initiated non-secret settings transfer from the official web origin.
window.addEventListener('message',e=>{if(e.source!==window||e.origin!==location.origin||e.origin!=='https://natural-english-app.hacmazmark-123.workers.dev'||e.data?.type!=='ne-sync-settings')return;chrome.runtime.sendMessage({type:'ne-sync-settings',settings:e.data.settings}).catch(()=>{})});
