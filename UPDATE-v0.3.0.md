# Cập nhật từ v0.2.0 lên v0.3.0 (Windows / PowerShell)

Không tạo repository hoặc Cloudflare Worker mới. Không xóa thư mục .git. Không đổi URL website hiện tại.

1. Trong VS Code đang mở thư mục `D:\MyApplications\NaturalEnglish-Cloud-v0.2.0`, chạy `git status` và `git diff`. Nếu còn thay đổi chưa commit, xem và sao lưu/commit trước, tránh ghi đè. Chạy `git pull --ff-only origin main` khi working tree sạch. Nếu pull báo lỗi thì dừng và kiểm tra, không force push.
2. Giải nén ZIP source v0.3.0 vào thư mục tạm riêng, ví dụ `D:\MyApplications\NaturalEnglish-Cloud-v0.3.0`. ZIP chứa package.json ở gốc. Không giải nén chồng thư mục Git đang dùng ngay.
3. Tại Terminal của dự án cũ, sao chép file bản mới (đổi đường dẫn nếu khác):

```powershell
$new = 'D:\MyApplications\NaturalEnglish-Cloud-v0.3.0'
Copy-Item -Path "$new\*" -Destination . -Recurse -Force
Copy-Item "$new\.gitignore" -Destination . -Force
Copy-Item "$new\.env.example" -Destination . -Force
```

ZIP không có .git, .env, key hoặc node_modules. Không sao chép key vào mã nguồn. Giữ .git của dự án cũ. Nếu bạn đã tự sửa thêm các file so với bản đã gửi, xem diff kỹ và hợp nhất thay vì ghi đè các tùy chỉnh đó.

4. Kiểm tra và build:

```powershell
npm.cmd test
npm.cmd run build
git status
git diff --stat
```

5. Khi test thành công, xem file thay đổi, đảm bảo không có file key, rồi commit:

```powershell
git add web extension src build.mjs package.json server.mjs tests.mjs cloud.test.mjs README.md CHANGELOG.md ROADMAP.md DEPLOY-CLOUDFLARE.md UPDATE-v0.3.0.md
git diff --cached --stat
git commit -m "Release v0.3.0: responsive UI and token-saving translation"
git push origin main
```

6. Cloudflare Dashboard → Workers & Pages → natural-english-app → Deployments/Builds. Kiểm tra commit mới đã deploy. Nếu auto deploy chưa bật hoặc thất bại, kiểm tra Builds logs và cấu hình Git (main, deploy npx wrangler deploy). Không tạo app mới. Mở https://natural-english-app.hacmazmark-123.workers.dev/api/health, phải thấy version 0.3.0. Ctrl+Shift+R website. Nếu còn giao diện cũ, thử tab ẩn danh hoặc unregister service worker trong DevTools Application (không xóa toàn bộ storage nếu muốn giữ lịch sử).

7. Extension: chrome://extensions/ → Natural English → Details xem thư mục nguồn. Nếu đã Load unpacked từ thư mục dự án `extension`, chỉ nhấn Reload. Nếu cài từ ZIP riêng, giải nén ZIP Chrome v0.3.0 vào thư mục tạm, copy các file vào đúng thư mục Extension cũ, sau đó Reload. Đảm bảo hiện Version 0.3.0. Nhập lại API key nếu cần, chọn `gemini-flash-lite-latest`, tắt Demo, lưu và test. Nhấn icon để mở popup, Alt+Shift+T để mở Side Panel, hoặc nút Thanh bên. Không cần bật Node.js/server để dịch online.

8. Kiểm thử thật: chọn Nhanh, dịch câu mới; kết quả cần có ba văn phong, thống kê token khi provider trả metadata. Dịch lại cùng nội dung trong cùng trang → Cache · 0 token mới. Chọn Thông minh để có từ vựng/mẫu câu. Nếu gặp HTTP 503, có thể bật thử lại một lần trong Cài đặt hoặc chọn model khác. Nếu chạm giới hạn token, giảm số văn phong/chia nhỏ văn bản. Không gửi API key qua ảnh/chats.
