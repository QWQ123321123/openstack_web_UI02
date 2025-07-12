from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
import openstack

os_bp = Blueprint('openstack', __name__)

def get_conn():
    return openstack.connect(
        auth_url='http://192.168.100.10:5000/v3',
        project_name='demo',
        username='admin',
        password='000000',
        user_domain_name='Default',
        project_domain_name='Default'
    )

@os_bp.route('/servers', methods=['GET'])
@jwt_required()
def list_servers():
    conn = get_conn()
    servers = []
    for server in conn.compute.servers():
        servers.append({'id': server.id, 'name': server.name, 'status': server.status})
    return jsonify(servers)

@os_bp.route('/servers/<server_id>/action', methods=['POST'])
@jwt_required()
def server_action(server_id):
    action = request.json.get('action')
    conn = get_conn()
    server = conn.compute.get_server(server_id)
    if action == 'start':
        conn.compute.start_server(server)
    elif action == 'stop':
        conn.compute.stop_server(server)
    elif action == 'delete':
        conn.compute.delete_server(server)
    else:
        return jsonify({'msg': 'Invalid action'}), 400
    return jsonify({'msg': 'Action performed'})