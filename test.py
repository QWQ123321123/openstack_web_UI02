import openstack

def main():
    try:
        conn = openstack.connect(
            auth_url='http://192.168.100.10:5000/v3',
            project_name='admin',
            username='admin',
            password='000000',
            user_domain_name='demo',
            project_domain_name='demo'
        )
        print("认证成功，正在获取云主机列表...")
        servers = list(conn.compute.servers())
        if not servers:
            print("没有云主机。")
        else:
            for server in servers:
                print(f"ID: {server.id}, 名称: {server.name}, 状态: {server.status}")
    except Exception as e:
        print("发生错误：", e)

if __name__ == "__main__":
    main()