# Changelog
## 0.3.0 — Performance & Productivity
- Popup riêng 560 x 570 CSS px, Side Panel riêng responsive, bố cục web và mobile gọn hơn; nút mở thanh bên.
- Nhanh / Thông minh / Học sâu / Tùy chọn; mặc định Nhanh khi nâng cấp, giảm nội dung thừa; giới hạn đầu ra theo độ dài và số văn phong.
- Gemini Flash-Lite alias mặc định cho cài đặt mới; giữ model đã lưu; tải danh sách Gemini theo yêu cầu.
- Thống kê token theo metadata, cache bộ nhớ trang tối đa 40 kết quả, retry 503 tùy chọn (mặc định tắt).
- API test riêng, status upstream, xử lý thought và JSON, giới hạn thinking với một số model xác định; giữ redirect manual.
- 17 tests tự động đạt, chưa xác nhận end-to-end trên Chrome/Cloudflare thật.
## 0.2.0
- Cloudflare Worker + static assets, BYOK, hỗ trợ Extension backend HTTPS.
