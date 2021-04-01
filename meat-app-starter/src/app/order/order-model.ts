class Pedido {
    constructor(
        public address: string,
        public optionalAddress: string,
        public number: number,
        public paymentOption: string,
        public orderItems: PedidoItem[]) {
    }
}

class PedidoItem {
    constructor(public quantity: number, public menuId: string) { }
}

export { Pedido, PedidoItem }