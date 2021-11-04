import { PaymentmethodsInterface } from "./IPaymentmethod";
import { ProductsInterface } from "./IProduct";
import { UsersInterface } from "./IUser";

export interface PreorderInterface {
    ID: number,
    Amount: number,
    UserID: number,
    User: UsersInterface
    ProductID: number,
    Product: ProductsInterface,
    PaymentmethodID: number,
    Paymentmethod: PaymentmethodsInterface,

}