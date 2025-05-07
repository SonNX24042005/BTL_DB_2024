# Cài WSL 1 Ubuntu phiên bản LTS
BƯỚC 1: Ấn tổ hợp phím Windows + S, gõ và chọn Turn Windows features on or off  
BƯỚC 2: Tích chọn ô Windows Subsystem for Linux (chọn cả Virtual Machine Platform nếu dùng WSL 2)  
BƯỚC 3: Khởi động lại máy  
BƯỚC 4: Mở Microsoft Store tìm kiếm Ubuntu 22.04 LTS (hoặc bản nào cũng được nhưng khuyết khích dùng 22.04 LTS mình đã dùng thử và không xảy ra lỗi)  
BƯỚC 5: Nhấn cài đặt Ubuntu 22.04 LTS  
BƯỚC 6: Mở CMD (Ấn tổ hợp phím Windows + S, gõ và chọn cmd)  
``` wsl --set-version Ubuntu-22.04 1 ```   
BƯỚC 7: Mở Ubuntu 22.04 LTS và làm theo hướng dẫn của Ubuntu (Ubuntu sẽ yêu cầu tạo tài khoản và mật khẩu người dùng)
# Cài node.js phiên bản LTS
BƯỚC 1: Mở Ubuntu 22.04 LTS  
BƯỚC 2: Chạy lệnh  
```sudo apt update && sudo apt upgrade -y```  
BƯỚC 3: Chạy lệnh    
```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash```  
BƯỚC 4: Chạy lệnh  
```\. "$HOME/.nvm/nvm.sh"```  
BƯỚC 5: Chạy lệnh  
```nvm install 22```  
# Cài nginx 
BƯỚC 1: Mở Ubuntu 22.04 LTS  
BƯỚC 2: Chạy lệnh  
```sudo apt install nginx```