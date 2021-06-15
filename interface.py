import sys
from PyQt5 import QtWidgets
import design
from socket import *
from ast import literal_eval


def get_ip():
    s = socket(AF_INET, SOCK_DGRAM)
    try:
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP


class ExampleApp(QtWidgets.QMainWindow, design.Ui_MainWindow):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.findDevicesBtn.clicked.connect(self.find_devices)
        self.connectBtn.clicked.connect(self.connect)

        self.ip_addr = get_ip()
        self.sock = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP)
        self.sock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
        self.sock.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)
        self.sock.settimeout(0.5)
        self.sock.bind((get_ip(), 8082))

    def find_devices(self):
        self.devicesList.clear()
        dev_list = []
        message = b'CONN_WAIT'
        self.sock.sendto(message, ('255.255.255.255', 8090))
        while True:
            try:
                conn = self.sock.recvfrom(32)
                dev_addr = str(conn[1])
                if dev_addr not in dev_list:
                    dev_list.append(str(conn[1]))
            except timeout:
                break
        self.devicesList.addItems(dev_list)

    def connect(self):
        addreses = self.devicesList.selectedItems()
        for addr in addreses:
            self.sock.sendto(b'CONNECT', literal_eval(addr.text()))
            conn = self.sock.recvfrom(32)




def main():
    app = QtWidgets.QApplication(sys.argv)
    window = ExampleApp()
    window.show()
    app.exec_()


if __name__ == '__main__':
    main()
