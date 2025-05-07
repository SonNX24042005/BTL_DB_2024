# Cài WSL 1 Ubuntu phiên bản LTS
* BƯỚC 1: Ấn tổ hợp phím Windows + S, gõ và chọn Turn Windows features on or off  
* BƯỚC 2: Tích chọn ô Windows Subsystem for Linux (chọn cả Virtual Machine Platform nếu dùng WSL 2)  
* BƯỚC 3: Khởi động lại máy  
* BƯỚC 4: Mở Microsoft Store tìm kiếm Ubuntu 22.04 LTS (hoặc bản nào cũng được nhưng khuyết khích dùng 22.04 LTS mình đã dùng thử và không xảy ra lỗi)  
* BƯỚC 5: Nhấn cài đặt Ubuntu 22.04 LTS  
* BƯỚC 6: Mở CMD (Ấn tổ hợp phím Windows + S, gõ và chọn cmd)  
``` wsl --set-version Ubuntu-22.04 1 ```   
* BƯỚC 7: Mở Ubuntu 22.04 LTS và làm theo hướng dẫn của Ubuntu (Ubuntu sẽ yêu cầu tạo tài khoản và mật khẩu người dùng)
# Cài node.js phiên bản LTS
* BƯỚC 1: Mở Ubuntu 22.04 LTS  
* BƯỚC 2: Chạy lệnh  
```sudo apt update && sudo apt upgrade -y```  
* BƯỚC 3: Chạy lệnh    
```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash```  
* BƯỚC 4: Chạy lệnh  
```\. "$HOME/.nvm/nvm.sh"```  
* BƯỚC 5: Chạy lệnh  
```nvm install 22```  
# Tải mã nguồn về máy
* BƯỚC 1: Chạy lệnh  
```git clone git@github.com:SonNX24042005/BTL_DB_2024.git```
# Cài đặt nginx
* BƯỚC 1: Mở Ubuntu 22.04 LTS  
* BƯỚC 2: Chạy lệnh  
```sudo apt install nginx```  
* BƯỚC 3: Nhấn Win + S, gõ Windows Defender Firewall, chọn: Windows Defender Firewall with Advanced Security  
* BƯỚC 4: Chọn Inbound Rules (Bên tay trái)
* BƯỚC 5: Chọn New Rule (Bên tay phải)  
* BƯỚC 6: Trong hộp thoại:  
1. **Rule Type** → chọn **Port** → **Next**
2. **Protocol and Ports**:
   - Chọn **TCP**
   - Nhập số cổng nginx, ví dụ: `80` hoặc `443`
   - Nhấn **Next**
3. **Action** → chọn **Allow the connection** → **Next**
4. **Profile**:
   - Chọn cả **Domain**, **Private**, và **Public** nếu bạn muốn truy cập trong mọi trường hợp
   - Nhấn **Next**
5. **Name** → nhập tên như: `Nginx HTTP Port 80` → **Finish**
# Cấu hình nginx
* BƯỚC 1: Làm cách nào đó bạn phải copy hoàn toàn folder qldt vào thư mực /var/www  
* BƯỚC 2: Mở Ubuntu 22.04 LTS  
* BƯỚC 3: Chạy lệnh  
```sudo chown -R $USER:$USER /var/www/qldt/Frontend```  
* BƯỚC 4: Chạy lệnh  
```sudo chmod -R 755 /var/www/qldt```
* BƯỚC 5: Chạy lệnh  
```sudo nano /etc/nginx/sites-enabled/qldt```  
* BƯỚC 6: Dán sau đó nhấn ctrl + S và ctrl + X để lưu  
    ``` 
    server {
        listen 80;
        server_name www.732820server03.id.vn; # Hoặc tên miền của bạn

        root /var/www/qldt/Frontend;
        index index.html index.htm;

        location ~* \.(?:css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1M;
            add_header Cache-Control "public";
            access_log off;
        }


        location ~ \.html$ {
            try_files $uri =404;
        }
    }  
* BƯỚC 7: Chạy lệnh  
```sudo nginx -t```  
Không lỗi mới làm bướctiếp theo  
* BƯỚC 8: Chạy lệnh  
```sudo service nginx start```  
# Chạy backend
* BƯỚC 1: Di chuyển đến thư mục backend  
* BƯỚC 2: Chạy lệnh  
```node server.js```  
* BƯỚC 3: Mở domain bạn đã điền ở phần cấu hình nginx bằng trình duyệt
