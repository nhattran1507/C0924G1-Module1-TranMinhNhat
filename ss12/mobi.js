class Mobile {
    constructor(name) {
        this.name = name;
        this.battery = 100; // Mức pin tối đa là 100 đơn vị
        this.isOn = false; // Trạng thái bật/tắt của điện thoại
        this.draftMessage = ""; // Vùng nhớ lưu tin nhắn đang soạn thảo
        this.inbox = []; // Vùng nhớ lưu tin nhắn trong hộp thư đến
        this.sentMessages = []; // Vùng nhớ lưu tin nhắn đã gửi
    }

    // Kiểm tra trạng thái điện thoại bật hay tắt
    checkStatus() {
        return this.isOn ? "Điện thoại đang bật" : "Điện thoại đang tắt";
    }

    // Bật điện thoại
    turnOn() {
        this.isOn = true;
    }

    // Tắt điện thoại
    turnOff() {
        this.isOn = false;
    }

    // Xạc pin điện thoại
    chargeBattery() {
        if (this.battery < 100) {
            this.battery = 100;
        }
    }

    // Giảm mức pin sau mỗi hành động
    decreaseBattery() {
        if (this.battery > 0) {
            this.battery--;
        }
    }

    // Soạn tin nhắn
    draft(message) {
        if (this.isOn) {
            this.draftMessage = message;
            this.decreaseBattery();
        } else {
            console.log("Điện thoại đang tắt. Không thể soạn tin nhắn.");
        }
    }

    // Gửi tin nhắn tới một chiếc mobile khác
    sendMessage(receiver) {
        if (this.isOn && this.draftMessage) {
            receiver.receiveMessage(this.draftMessage, this.name);
            this.sentMessages.push(this.draftMessage);
            this.draftMessage = ""; // Xóa tin nhắn sau khi gửi
            this.decreaseBattery();
        } else if (!this.isOn) {
            console.log("Điện thoại đang tắt. Không thể gửi tin nhắn.");
        } else {
            console.log("Không có tin nhắn nào để gửi.");
        }
    }

    // Nhận tin nhắn từ một chiếc mobile khác
    receiveMessage(message, senderName) {
        if (this.isOn) {
            this.inbox.push({ message, sender: senderName });
            this.decreaseBattery();
        }
    }

    // Xem tin trong hộp thư đến
    viewInbox() {
        if (this.isOn) {
            return this.inbox;
        } else {
            console.log("Điện thoại đang tắt. Không thể xem hộp thư đến.");
            return [];
        }
    }

    // Xem tin đã gửi
    viewSentMessages() {
        if (this.isOn) {
            return this.sentMessages;
        } else {
            console.log("Điện thoại đang tắt. Không thể xem tin đã gửi.");
            return [];
        }
    }
}
