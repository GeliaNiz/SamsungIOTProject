from socket import *
sock = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP)
sock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
sock.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)
sock.bind(('192.168.31.110', 8084))
while True:
    msg = sock.recvfrom(1024)
    sock.sendto(b'aghghghghga',msg[1])
    print(msg[0])