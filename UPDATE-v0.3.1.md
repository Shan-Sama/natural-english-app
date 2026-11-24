# Natural English v0.3.1 — Cập nhật trên Windows

## 1. Sao lưu và cập nhật Git

Bản này tiếp tục dùng repo `https://github.com/Shan-Sama/natural-english-app.git` và Worker `https://natural-english-app.hacmazmark-123.workers.dev`. Không tạo lại repo/Worker. Giải nén ZIP v0.3.1 vào `D:\MyApplications\NaturalEnglish-Cloud-v0.3.1` (có package.json trực tiếp trong thư mục). Mở VS Code ở thư mục Git cũ (dù tên vẫn là v0.2.0), mở PowerShell:

```powershell
Set-Location 'D:\MyApplications\NaturalEnglish-Cloud-v0.2.0'
git status
```

Nếu có thay đổi chưa commit, dừng và sao lưu/commit trước. Nếu sạch:

```powershell
git pull --ff-only origin main
$new = 'D:\MyApplications\NaturalEnglish-Cloud-v0.3.1'
Test-Path "$new\package.json"
```

Chỉ tiếp tục nếu `True` và git pull thành công. Sao chép các file mới, không đụng tới `.git`:

```powershell
Copy-Item -Path "$new\*" -Destination . -Recurse -Force
Copy-Item "$new\.gitignore" -Destination . -Force
Copy-Item "$new\.env.example" -Destination . -Force
npm.cmd test
npm.cmd run build
git status
git diff --stat
```

Dừng nếu test/build lỗi. Không commit file key thật, `.env`, backup dữ liệu cá nhân. Kiểm tra danh sách staged trước khi commit:

```powershell
git add .
git diff --cached --stat
git commit -m "Release v0.3.1: persistent sessions and spaced repetition"
git push origin main
```

Cloudflare tự deploy nếu Git integration đang bật. Xem Deployments, kiểm tra `https://natural-english-app.hacmazmark-123.workers.dev/api/health` trả `version: 0.3.1`. Nếu web cũ, Ctrl+Shift+R hoặc đóng/mở lại trang. Nếu PWA cũ, đóng mọi tab liên quan để service worker mới kích hoạt.

## 2. Extension

Nếu Chrome đã Load unpacked thư mục `extension` trong repo, sau build vào `chrome://extensions/`, bật Developer mode, nhấn Reload ở Natural English. Kiểm tra version 0.3.1. Nếu cài từ thư mục ZIP độc lập, giải nén ZIP Extension mới, chép đè file vào đúng thư mục cũ rồi Reload. Không gỡ trước khi sao lưu từ vựng (giữ nguyên đường dẫn để giữ Extension ID). Reload trang Web sau cập nhật Extension để content script đồng bộ được nạp. Không cần Node.js khi sử dụng.

## 3. Phiên làm việc và bảo mật

- Cài đặt → Khôi phục nội dung và kết quả khi mở lại: mặc định bật. Nội dung, bản dịch, tab và vị trí cuộn lưu trong bộ nhớ cục bộ của từng giao diện; có thể tắt/xóa. Sổ tay/lịch sử không bị xóa bởi nút xóa phiên làm việc.
- Extension xử lý dịch ở background và lưu job trong chrome.storage.session; mở lại Popup/Side Panel để khôi phục. Một yêu cầu đang chạy được khóa chống trùng. Cache tối đa 40 mục, giới hạn dung lượng; không gọi AI khi hit. Chrome có thể dừng service worker nếu bị suspend, restart hoặc request kéo dài; ứng dụng báo gián đoạn, không tự gửi lại. Kết quả web và extension không tự đồng bộ.
- API key mặc định giữ trong phiên (Extension chrome.storage.session; Web sessionStorage theo tab). Tùy chọn ghi nhớ qua restart lưu key không mã hóa trên thiết bị, chỉ bật trên máy riêng. Bấm Xóa key để xóa cả hai loại lưu trữ. Không lưu key tại Cloudflare; Web vẫn phải gửi key qua Worker để gọi AI. Không đưa key vào Git.
- Cài đặt → Khi nhấn biểu tượng Extension: Popup, Thanh bên hoặc Tab riêng. Chrome vẫn có thể đóng Popup khi mất focus.
- Web → Cài đặt → Lưu cài đặt → Gửi cài đặt sang Extension. Mở Extension → Cài đặt → Áp dụng cài đặt từ Web. Chỉ dùng origin chính thức; chuyển provider, model, độ sâu, văn phong, retry/cache; không chuyển API key, lịch sử hay sổ tay. Chuyển provider sẽ xóa key cũ trên Extension để tránh dùng nhầm.

## 4. Từ vựng và Flashcard

Trong Smart/Deep/Custom, nhấn ☆ Lưu cạnh từ hoặc mẫu câu. Vào Sổ tay:
- Ôn Flashcard: ưu tiên thẻ đến hạn, hiện mặt trước, nhấn Hiện đáp án rồi chấm Quên/Khó/Tốt/Dễ. Hiển thị khoảng thời gian dự kiến trên nút. Lịch ôn lưu trên thiết bị, không gọi AI.
- Thuật toán Anki-inspired kiểu legacy SM-2: thẻ mới có bước 1/10 phút; Tốt hoàn tất học sau bước 10 phút → 1 ngày; Dễ tốt nghiệp 4 ngày. Thẻ review dùng ease khởi tạo 2.5, sàn 1.3; Khó khoảng 1.2x; Tốt khoảng ease x; Dễ khoảng ease x 1.3, điều chỉnh ease. Quên giảm ease 0.2 và vào học lại 10 phút, giảm interval khoảng một nửa. Đây là bản mô phỏng legacy, không phải FSRS hay lịch Anki chính xác.
- Xuất Anki TSV: UTF-8, 3 cột Term/Meaning/Example, không có header. Trong Anki Desktop File → Import, chọn separator Tab, tạo note type có ba trường hoặc ánh xạ hai trường chính và bỏ qua ví dụ. Với 3 trường: mẫu trước `{{Term}}`, mẫu sau `{{FrontSide}}<hr id=answer>{{Meaning}}<br>{{Example}}`. Tắt Allow HTML nếu không cần. Anki tạo lịch riêng; TSV không mang lịch ôn từ app.
- CSV: mở Excel/Sheets, 3 cột; có header và BOM UTF-8.
- Sao lưu JSON: gồm từ, nghĩa, ví dụ, trạng thái lịch ôn. Không gồm API key hoặc lịch sử dịch. Nhập JSON để chuyển giữa Web/Extension hoặc máy khác; trùng Term giữ dữ liệu sẵn có. Không hỗ trợ import trực tiếp .apkg.

## 5. Kiểm thử

Chạy npm.cmd test và npm.cmd run build. Các test tự động mô phỏng API; chưa thay thế việc kiểm thử API key thật và Cloudflare production. Sau cập nhật thử một bản dịch ở chế độ Quick, đóng Popup khi đang dịch rồi mở lại; kiểm tra kết quả và input được giữ. Thử Smart lưu từ, ôn một thẻ, xuất TSV/JSON; thử reload Extension. Không gửi API key khi báo lỗi.
