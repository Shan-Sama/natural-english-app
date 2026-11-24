# Cập nhật v0.3.1

Xem [UPDATE-v0.3.1.md](UPDATE-v0.3.1.md) cho hướng dẫn Git, phiên làm việc, đồng bộ cài đặt, Flashcard và xuất/nhập từ vựng. Nội dung v0.3.0 bên dưới vẫn mô tả nền tảng cũ; ưu tiên hướng dẫn v0.3.1 nếu có khác biệt.

# Natural English 0.3.0 — Performance & Productivity

Dịch Việt–Anh/Anh–Việt, viết lại, gợi ý trả lời; Web/PWA + Chrome Extension Manifest V3. BYOK: mỗi người dùng tự cung cấp key, không dùng key chung. Website chạy Cloudflare Workers, không cần máy cá nhân bật Node.js.

- Website hiện tại: https://natural-english-app.hacmazmark-123.workers.dev
- Repo: https://github.com/Shan-Sama/natural-english-app
- Cập nhật: [UPDATE-v0.3.0.md](UPDATE-v0.3.0.md)
- Triển khai: [DEPLOY-CLOUDFLARE.md](DEPLOY-CLOUDFLARE.md)

## Sử dụng
1. Cài đặt → chọn Google Gemini, model `gemini-flash-lite-latest` (alias có thể đổi), nhập key cá nhân, bỏ chọn Demo, Lưu cài đặt. Tải model Gemini để lấy các tên model hỗ trợ generateContent; danh sách không bảo đảm hạn mức hay model hỗ trợ dịch. Kiểm tra API dùng một yêu cầu văn bản nhỏ, không tạo bản dịch nhiều phong cách.
2. Dịch AI → Nhanh (mặc định, 3 văn phong) / Thông minh (5) / Học sâu (10) / Tùy chọn. Chế độ Nhanh chỉ yêu cầu bản dịch. Chế độ khác giới hạn số ví dụ và giải thích. Chọn ngữ cảnh/tác vụ nếu cần. Ctrl+Enter để dịch.
3. Sau khi AI trả lời, xem thống kê input, output, thinking, total từ metadata nhà cung cấp; dấu — là không có dữ liệu. Thinking có thể đã nằm trong output hoặc total tùy provider; không cộng tay. Nếu retry, số liệu chỉ là lượt thành công. Cache trong bộ nhớ của trang đang mở tối đa 40 kết quả, chỉ dùng lại khi nội dung và cấu hình trùng khớp; không gọi AI mới khi trúng cache. Cache mất khi reload/đóng popup hoặc lưu cấu hình, xóa key. Không dùng tự động model dự phòng. Retry 503 một lần là tùy chọn, mặc định tắt.
4. Nút Copy / Nghe, lịch sử và sổ tay/flashcards giữ chức năng cũ. Chế độ Demo dùng nội dung minh họa cố định, không dịch nội dung thật. Không tự động gửi tin nhắn.

## Extension
`npm.cmd run build` đồng bộ UI từ `web/` sang `extension/`, sinh `popup.html` (560 x 570 CSS px theo thiết kế) và `sidepanel.html` (responsive). Chrome → chrome://extensions/ → Developer mode → Load unpacked → chọn **extension**. Nếu đã cài từ thư mục này, chỉ nhấn Reload. Nếu đang cài từ ZIP riêng, cập nhật vào chính thư mục đó rồi Reload để giữ ID và dữ liệu; không cần cài thêm bản trùng. Popup có nút Thanh bên, hoặc `Alt+Shift+T` (xem phím tắt tại chrome://extensions/shortcuts). Chọn đoạn văn → chuột phải → Natural English để đưa đoạn văn vào Side Panel, sau đó chủ động bấm Dịch. Gemini gọi trực tiếp; OpenAI gọi backend HTTPS đã thiết lập, cần cấp quyền host. Ollama chỉ dùng trên máy có Ollama chạy local. Không cần Node khi sử dụng Extension.

## API cá nhân
- Gemini: https://aistudio.google.com/app/apikey; sử dụng model được cấp quyền và kiểm tra quota. Alias có thể đổi theo nhà cung cấp. Một số model Flash-Lite cụ thể dùng thinking tối thiểu; alias không ép tham số thinking để tránh lỗi tương thích. Giới hạn đầu ra theo độ dài và số văn phong, tối đa 16000 token cấu hình. Nếu chạm giới hạn, chia đoạn hoặc giảm văn phong; không tự gọi tiếp.
- OpenAI: https://platform.openai.com/api-keys; dùng model hỗ trợ Chat Completions JSON mode và max_completion_tokens (ví dụ gpt-4.1-mini, tùy quyền tài khoản). API tính phí riêng với ChatGPT. Extension cần backend Cloudflare (URL mặc định trên bản này, có thể đổi). Web online không chạy Ollama.
- Ollama: https://ollama.com/; chỉ local. Không mở cổng ra Internet.

## Quyền riêng tư và chi phí
Key web chỉ giữ trong bộ nhớ tab; Extension dùng chrome.storage.session đến khi phiên trình duyệt kết thúc, có thể phải nhập lại sau Reload hoặc restart. Không lưu key vĩnh viễn, không đưa key vào lịch sử/cache hoặc commit. Web và Extension OpenAI gửi key/nội dung qua máy chủ trung gian; chỉ sử dụng máy chủ tin cậy. Backend không chủ động lưu/log request, không trả nguyên lỗi provider. Rate limit IP không thay thế xác thực/chống bot. Khi chia sẻ công khai nên bổ sung kiểm soát truy cập, rà soát bảo mật và chính sách riêng tư. Lịch sử, sổ tay lưu trên từng thiết bị, không đồng bộ giữa Web/Extension. Có thể tắt lưu lịch sử và xóa dữ liệu trong ứng dụng. Không nhập dữ liệu nhạy cảm nếu không tin cậy provider/host. Hosting và AI có hạn mức riêng; không hứa miễn phí không giới hạn.

## Phát triển
Node.js 22+; `npm.cmd test`, `npm.cmd run build`, `npm.cmd start` (local tại http://127.0.0.1:8787). Hai lệnh test/build không cần npm install. Nếu cần Wrangler CLI local, npm install rồi npm run dev:cloud hoặc npm run deploy. Deploy thông thường qua GitHub → Cloudflare. Không đưa node_modules hay .env vào Git.

## Kiểm thử v0.3.0
17/17 Node tests pass, provider/Worker bindings giả lập; kiểm tra cú pháp và build Extension thành công. Browser end-to-end chưa xác nhận vì môi trường kiểm thử chặn truy cập localhost (ERR_BLOCKED_BY_ADMINISTRATOR); chưa gọi AI bằng key thật, chưa deploy lên Cloudflare, chưa kiểm thử popup Chrome trên máy người dùng. Kiểm tra thực tế theo UPDATE-v0.3.0.md.
