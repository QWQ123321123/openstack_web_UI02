# Flask OpenStack 控制后端

## 安装依赖
pip install -r requirements.txt

## 启动
python app.py

## 说明
- 默认监听 5001 端口
- 用户注册/登录接口：/api/auth/register, /api/auth/login
- 云主机操作接口：/api/os/servers, /api/os/servers/<id>/action

## 注意
- 将openstack_api里的认证信息替换成你部署的openstack平台的认证信息