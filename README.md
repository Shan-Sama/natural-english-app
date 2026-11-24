
## Cloud Edition v0.2.0
Đọc [DEPLOY-CLOUDFLARE.md](DEPLOY-CLOUDFLARE.md) trước: hướng dẫn GitHub, Cloudflare và Extension online. Hướng dẫn cổng 8787/OpenAI local của v0.1 bên dưới không còn áp dụng cho Extension.
# Natural English 0.1.0 — MVP

Web/PWA + Chrome Extension, giao diện dùng chung, Node.js thuần và JavaScript ES modules. Không cần npm install, không cần database, không có API key mặc định. Đây là MVP tự chạy, không phải bản production đã kiểm toán bảo mật.

## Windows / macOS / Linux
1. Cài Node.js 22+ từ https://nodejs.org/.
2. Giải nén source, mở Terminal/PowerShell tại thư mục chứa package.json.
3. `npm start` rồi truy cập http://127.0.0.1:8787. Không mở index.html bằng file://.
4. Vào Cài đặt. Demo được bật mặc định và chỉ hiển thị một câu mẫu cố định. Để dịch thật, chọn provider/model, nhập key, bỏ chọn Demo, lưu và kiểm tra API. Ctrl+Enter để dịch.

## Chrome Extension
Giải nén ZIP extension vào thư mục cố định. Chrome → chrome://extensions/ → Developer mode → Load unpacked → chọn thư mục chứa manifest.json. Ghim tiện ích. Popup khi click; Alt+Shift+T để mở Side Panel (có thể sửa tại chrome://extensions/shortcuts); bôi đen chữ → chuột phải → Natural English – Dịch văn bản đã chọn. Sau đó bấm Dịch AI để chủ động gửi nội dung. Dùng Chrome phiên bản hiện đại hỗ trợ sidePanel.open. Khi thay source chạy `npm run build` rồi Reload extension. Extension Gemini/Ollama không cần web server; OpenAI cần `npm start` trên máy cá nhân ở cổng 8787. Không tự động gửi tin nhắn.

## API cá nhân (BYOK)
- Gemini: https://aistudio.google.com/app/apikey → đăng nhập → tạo key theo hướng dẫn của Google. Chọn Gemini, nhập model ID được tài khoản hỗ trợ (giá trị mặc định chỉ là ví dụ), dán key. Kiểm tra quota, điều khoản, thanh toán và khu vực tại trang quản lý của Google.
- OpenAI: https://platform.openai.com/api-keys → tạo key riêng cho project; kiểm tra billing và giới hạn chi tiêu tại https://platform.openai.com/. ChatGPT Plus không bao gồm API credit. Chọn OpenAI, điền model hỗ trợ Chat Completions JSON mode. Web gửi key tới relay cùng origin; Extension dùng relay local, không gọi OpenAI trực tiếp. Relay không lưu key, nhưng có thể đọc key trong lúc xử lý. Không dùng relay không đáng tin.
- Ollama: https://ollama.com/ → cài đặt → `ollama pull qwen3:8b` (ví dụ, chọn model phù hợp RAM) → đảm bảo Ollama đang chạy tại 127.0.0.1:11434. Chọn Ollama, model đúng tên đã pull, bỏ trống key. Nếu bị chặn origin từ extension, kiểm tra cấu hình Ollama; không mở CORS toàn bộ hoặc expose cổng Internet. Web chỉ bật Ollama khi server bind localhost. Model và phiên bản API thực tế có thể thay đổi.

## Chia sẻ cho người khác
Gửi ZIP extension/source; không gửi API key. Mỗi người tự lấy key và tự cấu hình trên thiết bị. Lịch sử/từ vựng/cấu hình lưu localStorage của từng ứng dụng, không đồng bộ web-extension; mặc định lịch sử bật, có thể tắt và xóa. Key web chỉ giữ trong bộ nhớ trang đến khi reload; extension giữ chrome.storage.session trong phiên trình duyệt. Đây không phải kho bí mật mã hóa; người có quyền kiểm soát trình duyệt hoặc mã độc vẫn có thể lấy key. Chỉ dùng key riêng có quota thấp, thu hồi khi cần. Không gửi nội dung nhạy cảm nếu chưa hiểu chính sách dữ liệu của provider.

## Web online / PWA
Khuyến nghị người khác tự chạy bản local để tránh phải tin tưởng máy chủ của bạn. Nếu host riêng, dùng dịch vụ hỗ trợ Node.js 22, start command `npm start`, đặt HOST=0.0.0.0 và PORT theo nhà cung cấp. Đặt HTTPS reverse proxy và xác thực người dùng (ví dụ access gateway) trước khi đưa lên Internet. Bản này chỉ có rate limit đơn giản, không có auth production, không log body nhưng cần tắt body logging trên proxy/hosting. Không công khai relay không xác thực. Người dùng nhập key qua HTTPS, máy chủ có khả năng nhìn thấy key; thông báo rõ. Không có key của chủ app trong môi trường. Đảm bảo Host header được giữ khi reverse proxy. PWA có thể cài từ trình duyệt hỗ trợ (iPhone Safari → Add to Home Screen) khi web chạy qua HTTPS; AI cloud vẫn cần mạng. Không thể chỉ host HTML trên GitHub Pages vì cần relay Node. Extension OpenAI vẫn dùng relay local, không tự chuyển tới web công khai. Không dùng API key trong manifest hoặc commit source.

## Phát triển, kiểm tra
`npm test` chạy unit test và mock provider; `npm run build` sao chép UI dùng chung vào extension. Chưa kiểm thử thực tế trên Chrome/iOS hoặc gọi AI thật (không có credential). Model mặc định là ví dụ có thể cần đổi. Sổ tay/flashcard cơ bản, phát âm phụ thuộc trình duyệt. Không có cache kết quả AI, retry tự động, login, sync hay publish Web Store. Tích hợp Chrome Web Store cần developer account, chính sách privacy và review; đóng gói thư mục extension. Không tự động gửi nội dung lựa chọn tới provider trước khi bấm dịch.
