# Changelog
## 0.3.1 — Persistent Session & Vocabulary Review
- Khôi phục draft, kết quả, tab và scroll; xử lý job dịch Extension ở background; cache session chia sẻ Popup/Side Panel.
- API key lưu theo phiên mặc định, lưu lâu dài tùy chọn (không mã hóa); nút xóa phiên và key.
- Chọn Popup/Side Panel/Tab; chuyển cài đặt không nhạy cảm từ Web chính thức sang Extension với xác nhận.
- Flashcard giãn cách Anki-inspired legacy ease, học lại, 4 mức đánh giá; TSV cho Anki, CSV, JSON sao lưu và nhập JSON.
- Giữ Quick/Smart/Deep/Custom, thống kê token và BYOK.
- Xem UPDATE-v0.3.1.md để cập nhật.
## 0.3.0 — Performance & Productivity
- Popup riêng 560 x 570 CSS px, Side Panel riêng responsive, bố cục web và mobile gọn hơn; nút mở thanh bên.
- Nhanh / Thông minh / Học sâu / Tùy chọn; mặc định Nhanh khi nâng cấp, giảm nội dung thừa; giới hạn đầu ra theo độ dài và số văn phong.
- Gemini Flash-Lite alias mặc định cho cài đặt mới; giữ model đã lưu; tải danh sách Gemini theo yêu cầu.
- Thống kê token theo metadata, cache bộ nhớ trang tối đa 40 kết quả, retry 503 tùy chọn (mặc định tắt).
- API test riêng, status upstream, xử lý thought và JSON, giới hạn thinking với một số model xác định; giữ redirect manual.
- 17 tests tự động đạt, chưa xác nhận end-to-end trên Chrome/Cloudflare thật.
## 0.2.0
- Cloudflare Worker + static assets, BYOK, hỗ trợ Extension backend HTTPS.
