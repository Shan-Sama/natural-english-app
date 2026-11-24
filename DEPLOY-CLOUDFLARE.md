# Natural English 0.3.0 — triển khai Cloudflare

Repository đích: https://github.com/Shan-Sama/natural-english-app.git

## 1. Push source lần đầu (repo trống)
Giải nén ZIP, mở terminal tại thư mục có `wrangler.jsonc`.

```powershell
git init
git add .
git commit -m "Initial release: Natural English Cloud Edition v0.3.0"
git branch -M main
git remote add origin https://github.com/Shan-Sama/natural-english-app.git
git push -u origin main
```
Nếu repo đã có commit, clone repo rồi chép các file vào và commit bình thường; không force push.

## 2. Cloudflare
1. Đăng nhập https://dash.cloudflare.com/ và mở Workers & Pages.
2. Create application → kết nối GitHub (Import a repository / Connect to Git), cấp quyền cho repo natural-english-app.
3. Chọn branch main, tên Worker `natural-english-app`, root directory để mặc định (gốc repo), build command để trống, deploy command `npx wrangler deploy`. Cloudflare cài dependencies theo package.json. Không cần đặt API key AI trong biến môi trường.
4. Deploy; lấy URL thật dạng `https://natural-english-app.<subdomain>.workers.dev` trong dashboard. Nếu chưa có subdomain workers.dev, đăng ký theo hướng dẫn.
5. Mở URL và `/api/health` (kỳ vọng `{ "ok": true, "version": "0.3.0" }`). Thử Demo rồi tắt Demo và thử API key riêng. Mỗi push lên main sẽ kích hoạt deploy khi Git integration đã bật.

Có thể triển khai lần đầu qua CLI thay cho Git integration: `npm install`, `npx wrangler login`, `npm run deploy`. Node chỉ cần để phát triển/deploy, không cần cho người dùng cuối. Để kiểm tra runtime local: `npm run dev:cloud`.

## 3. Chrome Extension
Giải nén ZIP Extension; chrome://extensions → Developer mode → Load unpacked → chọn thư mục có manifest.json. Nếu nâng cấp bản unpacked cũ, có thể thay file và nhấn Reload (giữ cùng thư mục/ID nếu cần giữ lịch sử).
- Gemini: chọn provider, model tài khoản hỗ trợ, nhập key riêng, tắt Demo, lưu và kiểm tra API. Gọi trực tiếp, không cần backend local hoặc cloud.
- OpenAI: nhập URL workers.dev thật vào Backend Cloudflare HTTPS (chỉ origin), nhập API key, tắt Demo, lưu và cấp quyền truy cập đúng origin khi Chrome hỏi. Kiểm tra API. Không dùng 127.0.0.1:8787 nữa.
- Ollama: vẫn cần Ollama chạy trên máy cá nhân, không được hỗ trợ bởi Worker công khai.

## 4. Bảo mật và giới hạn
Key chỉ giữ trong bộ nhớ tab web hoặc chrome.storage.session của Extension. Có thể phải nhập lại khi đóng/mở tab hoặc khởi động lại Chrome. Web và Extension OpenAI gửi key và nội dung đến Worker qua HTTPS; nhà vận hành máy chủ có khả năng đọc chúng. Chỉ dùng deployment đáng tin cậy; không nhúng key chung, không commit key, không chia sẻ key. Worker không chủ động lưu/log key hoặc văn bản, tắt observability trong config; kiểm tra thiết lập log và chính sách của Cloudflare/AI provider khi vận hành. CORS không phải xác thực, API công khai có thể bị gọi trực tiếp; rate limit 20 yêu cầu/phút theo IP trên từng vị trí Cloudflare là xấp xỉ, không phải giới hạn toàn cầu. Theo dõi quota; trước phát hành đại trà nên thêm xác thực hoặc chống bot, rà soát bảo mật và chính sách riêng tư. Không nhập dữ liệu nhạy cảm nếu không tin cậy dịch vụ.

## 5. Kiểm thử
`npm test` (17 tests Node, bao gồm Worker handler với bindings/provider giả lập); `npm run build` tạo lại assets extension. Chưa chạy Wrangler deploy hoặc AI thật và chưa kiểm thử Chrome thực tế. Sau deploy cần kiểm tra cả web và Extension bằng key cá nhân.

Tài liệu: https://developers.cloudflare.com/workers/static-assets/ và https://developers.cloudflare.com/workers/ci-cd/builds/.
